<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231212145723 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE admquote (id SERIAL NOT NULL, lang VARCHAR(5) NOT NULL, quote VARCHAR(4000) NOT NULL, author VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('INSERT INTO admquote (lang, quote, author) VALUES (\'EN\', \'Houston, we have a problem.\', \'Jim Lovell\')');
    }

    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP TABLE admquote');
    }
}
