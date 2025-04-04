<?php

namespace App\Service;

use App\Entity\Sector;
use App\Entity\Card;
use App\Entity\Attack;
use Doctrine\ORM\EntityManagerInterface;

class GameManager
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function handleAttack(Sector $sector, Attack $attack, int $diceRoll): array
    {
        $shieldCards = $sector->getShieldCards();
        $shieldDestroyed = false;
        $sectorDestroyed = false;
        $message = '';

        if (!$shieldCards->isEmpty()) {
            $shieldCard = $shieldCards[0]; // Première carte bouclier

            if ($attack->getSymbol() !== $sector->getSymbol()) {
                return ['message' => "Symbole incorrect. Attaque échouée.", 'shieldDestroyed' => false, 'sectorDestroyed' => false];
            }

            if ($diceRoll >= $shieldCard->getScore()) {
                // Bouclier détruit
                $sector->removeShieldCard($shieldCard);
                $this->entityManager->remove($shieldCard);
                $this->entityManager->flush();
                $shieldDestroyed = true;
                $message = "Bouclier brisé dans le secteur ! La carte bouclier a été défaussée.";

                // Détruire le secteur si le bouclier est détruit
                $this->entityManager->remove($sector);
                $this->entityManager->flush();
                $sectorDestroyed = true;
                $message .= " Secteur détruit !";
            } else {
                return ['message' => "Attaque échouée ! La carte At’Hack a été défaussée.", 'shieldDestroyed' => false, 'sectorDestroyed' => false];
            }
        } else {
            return ['message' => "Aucun bouclier disponible pour attaquer.", 'shieldDestroyed' => false, 'sectorDestroyed' => false];
        }

        // Tirer une carte événement si le secteur est détruit
        if ($sectorDestroyed) {
            $eventCard = $this->drawEventCard();
            $message .= " Événement tiré : " . $eventCard;
        }

        return ['message' => $message, 'shieldDestroyed' => $shieldDestroyed, 'sectorDestroyed' => $sectorDestroyed];
    }

    public function drawEventCard(): string
    {
        // Logique pour tirer une carte événement
        $events = ['Événement 1', 'Événement 2', 'Événement 3']; // Exemple d'événements
        $randomEvent = $events[array_rand($events)];

        return $randomEvent;
    }
}
