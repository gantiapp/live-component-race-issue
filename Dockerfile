FROM ubuntu:20.04 AS base

RUN export LC_ALL=en_US.UTF-8 \
    && export LANG=en_US.UTF-8

RUN DEBIAN_FRONTEND=noninteractive LC_ALL=en_US.UTF-8 apt-get update \
    && apt-get install -y software-properties-common \
    && DEBIAN_FRONTEND=noninteractive LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php

RUN DEBIAN_FRONTEND=noninteractive LC_ALL=en_US.UTF-8 apt-get update  \
    && DEBIAN_FRONTEND=noninteractive LC_ALL=en_US.UTF-8 apt-get install -y \
        # install alien for pdo driver
        alien \
        tzdata \
        apache2 \
        # install net tools
        net-tools \
        iputils-ping \
        telnet \
        nmap \
        tcpdump \
        # install tools
        locales \
        locales-all \
        # install Memcached
        memcached \
        libmemcached-dev \
        libmemcached-tools \
        zlib1g-dev \
        # install cron
        cron \
        git \
        php8.1 \
        libapache2-mod-php8.1 \
        php8.1-dev \
        php8.1-mysql \
        php8.1-pgsql \
        php8.1-xml \
        php8.1-ldap \
        php8.1-zip \
        php8.1-cli \
        php8.1-gd \
        php8.1-mbstring \
        php8.1-ssh2 \
        php8.1-curl \
        php8.1-zip \
        php8.1-xml \
        php8.1-memcached \
        php8.1-odbc \
        zip \
        unzip \
        vim \
        wget \
        ksh

# add PGSQL client
RUN  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && echo "deb https://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y postgresql-client-13

COPY --from=composer:2.4.1 /usr/bin/composer /usr/local/bin/composer

#php config
WORKDIR /etc/php/8.1/apache2
RUN sed -i "s/memory_limit = 128M/memory_limit = 4096M/" php.ini \
    && sed -i "s/session.gc_maxlifetime = 1440/session.gc_maxlifetime = 10800/" php.ini \
    && sed -i "s/max_execution_time = 30/max_execution_time = 300/" php.ini \
    && sed -i "s/upload_max_filesize = 2M/upload_max_filesize = 500M/" php.ini \
    && sed -i "s/post_max_size = 8M/post_max_size = 500M/" php.ini
WORKDIR /etc/php/8.1/cli
RUN sed -i "s/session.gc_maxlifetime = 1440/session.gc_maxlifetime = 10800/" php.ini \
    && sed -i "s/max_execution_time = 30/max_execution_time = 300/" php.ini

# Apache config
ADD docker/apache2/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod ssl  \
    && a2enmod rewrite \
    && mkdir /root/certs \
    && sed -i '/^\t<\/IfModule>/i \\t\tAddOutputFilterByType DEFLATE application/json' /etc/apache2/mods-available/deflate.conf

# clean
RUN apt-get autoremove --purge -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/pear

# Create SSH directory
WORKDIR /ssh
RUN chown -R www-data:www-data .

# Install ganti
WORKDIR /var/www/html/ganti

# add boot script
ADD docker/script/start_ganti.sh /root/

# we add /root dir in path
RUN echo "export PATH=$PATH:/root/" >> /root/.profile

ENTRYPOINT . /root/start_ganti.sh

FROM base AS dev

RUN apt-get update \
    && apt-get install -y ca-certificates curl gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update  \
    && apt-get install nodejs -y
