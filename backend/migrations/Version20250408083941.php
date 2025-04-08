<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250408083941 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bouclier DROP FOREIGN KEY bouclier_ibfk_1');
        $this->addSql('ALTER TABLE evenement DROP FOREIGN KEY evenement_ibfk_1');
        $this->addSql('ALTER TABLE maitredejeu DROP FOREIGN KEY maitredejeu_ibfk_2');
        $this->addSql('ALTER TABLE maitredejeu DROP FOREIGN KEY maitredejeu_ibfk_3');
        $this->addSql('ALTER TABLE maitredejeu DROP FOREIGN KEY maitredejeu_ibfk_1');
        $this->addSql('ALTER TABLE pochette DROP FOREIGN KEY pochette_ibfk_1');
        $this->addSql('ALTER TABLE rassembler DROP FOREIGN KEY rassembler_ibfk_1');
        $this->addSql('ALTER TABLE rassembler DROP FOREIGN KEY rassembler_ibfk_4');
        $this->addSql('ALTER TABLE rassembler DROP FOREIGN KEY rassembler_ibfk_2');
        $this->addSql('ALTER TABLE rassembler DROP FOREIGN KEY rassembler_ibfk_3');
        $this->addSql('DROP TABLE bouclier');
        $this->addSql('DROP TABLE evenement');
        $this->addSql('DROP TABLE jeux');
        $this->addSql('DROP TABLE maitredejeu');
        $this->addSql('DROP TABLE pirate');
        $this->addSql('DROP TABLE pochette');
        $this->addSql('DROP TABLE rassembler');
        $this->addSql('DROP TABLE secteur');
        $this->addSql('DROP TABLE signalements');
        $this->addSql('DROP TABLE utilisateurs');
        $this->addSql('ALTER TABLE attaque DROP nomAnglais, DROP secteurCible, DROP image_info, CHANGE Id_Attaque id_attaque INT NOT NULL, CHANGE nom nom VARCHAR(255) NOT NULL, CHANGE description description LONGTEXT NOT NULL, CHANGE image_url secteur_cible VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bouclier (Id_Bouclier INT AUTO_INCREMENT NOT NULL, type TINYINT(1) NOT NULL, niveau INT DEFAULT NULL, Id_Pochette INT DEFAULT NULL, image_url VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, INDEX Id_Pochette (Id_Pochette), PRIMARY KEY(Id_Bouclier)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE evenement (Id_Evenement INT AUTO_INCREMENT NOT NULL, type VARCHAR(150) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, description VARCHAR(150) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, Id_Bouclier INT NOT NULL, image_url VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, UNIQUE INDEX Id_Bouclier (Id_Bouclier), PRIMARY KEY(Id_Evenement)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE jeux (Id_Jeux INT AUTO_INCREMENT NOT NULL, sablier INT NOT NULL, dé INT DEFAULT NULL, PRIMARY KEY(Id_Jeux)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE maitredejeu (Id_MaitreDeJeu INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, Id_Secteur INT NOT NULL, Id_Pirate INT NOT NULL, Id_Jeux INT NOT NULL, INDEX Id_Pirate (Id_Pirate), INDEX Id_Jeux (Id_Jeux), UNIQUE INDEX Id_Secteur (Id_Secteur), PRIMARY KEY(Id_MaitreDeJeu)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE pirate (Id_Pirate INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, jeton INT DEFAULT NULL, PRIMARY KEY(Id_Pirate)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE pochette (Id_Pochette INT AUTO_INCREMENT NOT NULL, Id_Secteur INT NOT NULL, UNIQUE INDEX Id_Secteur (Id_Secteur), PRIMARY KEY(Id_Pochette)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE rassembler (Id_Pochette INT NOT NULL, Id_Bouclier INT NOT NULL, Id_Evenement INT NOT NULL, Id_Jeux INT NOT NULL, INDEX Id_Bouclier (Id_Bouclier), INDEX Id_Evenement (Id_Evenement), INDEX Id_Jeux (Id_Jeux), INDEX IDX_EA895BDA9514DC01 (Id_Pochette), PRIMARY KEY(Id_Pochette, Id_Bouclier, Id_Evenement, Id_Jeux)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE secteur (Id_Secteur INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, image_url VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, PRIMARY KEY(Id_Secteur)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE signalements (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, message TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, date_message DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE utilisateurs (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, email VARCHAR(150) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, motdepasse VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, UNIQUE INDEX email (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE bouclier ADD CONSTRAINT bouclier_ibfk_1 FOREIGN KEY (Id_Pochette) REFERENCES pochette (Id_Pochette)');
        $this->addSql('ALTER TABLE evenement ADD CONSTRAINT evenement_ibfk_1 FOREIGN KEY (Id_Bouclier) REFERENCES bouclier (Id_Bouclier)');
        $this->addSql('ALTER TABLE maitredejeu ADD CONSTRAINT maitredejeu_ibfk_2 FOREIGN KEY (Id_Pirate) REFERENCES pirate (Id_Pirate)');
        $this->addSql('ALTER TABLE maitredejeu ADD CONSTRAINT maitredejeu_ibfk_3 FOREIGN KEY (Id_Jeux) REFERENCES jeux (Id_Jeux)');
        $this->addSql('ALTER TABLE maitredejeu ADD CONSTRAINT maitredejeu_ibfk_1 FOREIGN KEY (Id_Secteur) REFERENCES secteur (Id_Secteur)');
        $this->addSql('ALTER TABLE pochette ADD CONSTRAINT pochette_ibfk_1 FOREIGN KEY (Id_Secteur) REFERENCES secteur (Id_Secteur)');
        $this->addSql('ALTER TABLE rassembler ADD CONSTRAINT rassembler_ibfk_1 FOREIGN KEY (Id_Pochette) REFERENCES pochette (Id_Pochette)');
        $this->addSql('ALTER TABLE rassembler ADD CONSTRAINT rassembler_ibfk_4 FOREIGN KEY (Id_Jeux) REFERENCES jeux (Id_Jeux)');
        $this->addSql('ALTER TABLE rassembler ADD CONSTRAINT rassembler_ibfk_2 FOREIGN KEY (Id_Bouclier) REFERENCES bouclier (Id_Bouclier)');
        $this->addSql('ALTER TABLE rassembler ADD CONSTRAINT rassembler_ibfk_3 FOREIGN KEY (Id_Evenement) REFERENCES evenement (Id_Evenement)');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('ALTER TABLE attaque ADD nomAnglais VARCHAR(50) DEFAULT NULL, ADD secteurCible VARCHAR(150) NOT NULL, ADD image_info VARCHAR(255) DEFAULT NULL, CHANGE id_attaque Id_Attaque INT AUTO_INCREMENT NOT NULL, CHANGE nom nom VARCHAR(50) NOT NULL, CHANGE description description VARCHAR(150) NOT NULL, CHANGE secteur_cible image_url VARCHAR(255) NOT NULL');
    }
}
