<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240407000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create Attaque table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE attaque (
            Id_Attaque INT NOT NULL,
            nom VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            secteurCible VARCHAR(255) NOT NULL,
            PRIMARY KEY(Id_Attaque)
        )');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE attaque');
    }
} 