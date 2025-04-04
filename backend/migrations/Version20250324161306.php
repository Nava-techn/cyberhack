<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250324161306 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE attack (id INT AUTO_INCREMENT NOT NULL, symbol VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE at_hack_card');
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3DE95C867');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3DE95C867 FOREIGN KEY (sector_id) REFERENCES sector (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE sector ADD image VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE at_hack_card (id INT AUTO_INCREMENT NOT NULL, symbol VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE attack');
        $this->addSql('ALTER TABLE card DROP FOREIGN KEY FK_161498D3DE95C867');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3DE95C867 FOREIGN KEY (sector_id) REFERENCES sector (id)');
        $this->addSql('ALTER TABLE sector DROP image');
    }
}
