<?php

namespace App\Service;

use App\Entity\Card;

class CardManager
{
    public function destroyCard(Card $card): array
    {
        $eventCards = [];

        // Si la carte est spéciale, tirez des cartes événements
        if ($card->getIsSpecial()) {
            // Logique pour tirer des cartes événements
            $eventCards = $this->drawEventCards();
        }

        // Supprimez la carte (cette partie doit être gérée dans le contrôleur)
        return $eventCards;
    }

    private function drawEventCards(): array
    {
        // Exemple de logique pour tirer des cartes événements
        return [
            ['type' => 'Événement', 'description' => 'Carte événement 1'],
            ['type' => 'Événement', 'description' => 'Carte événement 2'],
        ];
    }
}