#!/usr/bin/env bash

# we generate DATABASE_URL
DATABASE_URL="postgres://$DB_USER:$DB_PASSWORD""@""$DB_HOST:$DB_PORT/$DB_NAME"

cd /var/www/html/ganti

# in case we have a volume on .env.local file, we removed it
if [ -f /var/www/html/ganti/.env.local ]
then
  rm /var/www/html/ganti/.env.local
fi

# If php bin (via crontab) writes an error in first, file owner will be root with wrong rights
# TODO to delete when we'll have a dedicated user to Docker
for file in prod.log prod_saml.log prod_ldap.log dev.log dev_saml.log dev_ldap.log test.log test_saml.log test_ldap.log
do
  if [ ! -f /var/www/html/ganti/var/log/$file ]
  then
    touch /var/www/html/ganti/var/log/$file
    chmod 666 /var/www/html/ganti/var/log/$file
  fi
done

echo "DATABASE_URL=$DATABASE_URL" > /var/www/html/ganti/.env.local

# we add variables in .env.local because if not we can not delete env volume
printenv | grep "^SF_*" | cut -c4- >> /var/www/html/ganti/.env.local

chown www-data:www-data /var/www/html/ganti/.env.local

# to create variable environment for crontab script
printenv | grep "DB_" >> /usr/local/share/db_variables
chmod +x /usr/local/share/db_variables

chown -R www-data:www-data var/cache/

if [ -f /var/run/memcached.pid ]
then
  rm /var/run/memcached.pid
fi
service memcached start

# apache2 start
if [ -f /var/run/apache2/apache2.pid ]
then
  rm /var/run/apache2/apache2.pid
fi
#service apache2 start
apachectl -D FOREGROUND


