<?php

namespace App\DataFixtures;

use App\Entity\Sector;
use App\Entity\Card;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Création des secteurs avec leurs images
        $sectorA = new Sector();
        $sectorA->setSymbol("A");
        $sectorA->setImage("/images/reseaux.png"); // Chemin réel et accessible pour le secteur A
        $manager->persist($sectorA);

        $sectorB = new Sector();
        $sectorB->setSymbol("B");
        $sectorB->setImage("/images/reseaux.png"); // Chemin réel et accessible pour le secteur B
        $manager->persist($sectorB);

        // Création des cartes Boucliers et association aux secteurs
        $card1 = new Card();
        $card1->setSector($sectorA);
        $card1->setImageUrl("/images/bouclier_verso_1.png"); // Chemin réel pour la carte Bouclier
        $card1->setType("Bouclier");
        $card1->setIsSpecial(false); // Carte normale (non spéciale)
        $manager->persist($card1);

        $card2 = new Card();
        $card2->setSector($sectorB);
        $card2->setImageUrl("/images/bouclier_verso_2.png"); // Chemin réel pour la carte Bouclier spéciale
        $card2->setType("Bouclier");
        $card2->setIsSpecial(true); // Carte spéciale
        $manager->persist($card2);

        // Création de cartes sans secteurs
        $card3 = new Card();
        $card3->setSector(null); // Pas de secteur associé
        $card3->setImageUrl("/images/bouclier_dark_1.png");
        $card3->setType("Attaque");
        $card3->setIsSpecial(false);
        $manager->persist($card3);

        $card4 = new Card();
        $card4->setSector(null); // Pas de secteur associé
        $card4->setImageUrl("/images/bouclier_dark_2.png");
        $card4->setType("Défense");
        $card4->setIsSpecial(false);
        $manager->persist($card4);

        // Validation des données dans la base
        $manager->flush();
    }
}
