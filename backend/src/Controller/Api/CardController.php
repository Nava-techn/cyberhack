<?php

namespace App\Controller\Api;

use App\Entity\Card;
use App\Entity\Sector;
use App\Repository\CardRepository;
use App\Repository\SectorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class CardController extends AbstractController
{
    // Liste toutes les cartes
    #[Route('/cards', name: 'api_cards_list', methods: ['GET'])]
    public function list(CardRepository $cardRepository, SerializerInterface $serializer): JsonResponse
    {
        $cards = $cardRepository->findAll();

        if (empty($cards)) {
            return $this->json(['message' => 'Aucune carte disponible.'], Response::HTTP_NOT_FOUND);
        }

        $data = $serializer->serialize($cards, 'json', ['groups' => ['card:read']]);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    // Démarre une nouvelle partie
    #[Route('/start-game', name: 'api_start_game', methods: ['POST'])]
    public function startGame(CardRepository $cardRepository, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $cards = $cardRepository->findAll();

        if (empty($cards)) {
            return $this->json(['message' => 'Aucune carte à réinitialiser.'], Response::HTTP_NOT_FOUND);
        }

        foreach ($cards as $card) {
            $card->setIsSpecial(false);
        }

        $entityManager->flush();

        $data = $serializer->serialize($cards, 'json', ['groups' => ['card:read']]);
        return new JsonResponse([
            'message' => 'Nouvelle partie initialisée !',
            'data' => json_decode($data),
        ], Response::HTTP_OK);
    }

    // Gérer l'attaque et la destruction des boucliers
    #[Route('/attack/{sectorId}/{diceRoll}', name: 'game_attack', methods: ['POST'])]
public function attack(
    string $sectorId,
    int $diceRoll,
    SectorRepository $sectorRepository,
    CardRepository $cardRepository,
    EntityManagerInterface $entityManager,
    SerializerInterface $serializer
): JsonResponse {
    // Recherche du secteur par symbole
    $sector = $sectorRepository->findOneBy(['symbol' => $sectorId]);
    if (!$sector) {
        return $this->json(['message' => 'Secteur non trouvé.'], Response::HTTP_NOT_FOUND);
    }

    // Récupérer les cartes du secteur
    $cards = $cardRepository->findBy(['sector' => $sector]);

    // Trouver une carte bouclier dans le secteur
    $shieldCard = null;
    foreach ($cards as $card) {
        if ($card->getType() === 'Bouclier' && !$card->getIsSpecial()) {
            $shieldCard = $card;
            break;
        }
    }

    if (!$shieldCard) {
        return $this->json(['message' => 'Aucun bouclier dans ce secteur.'], Response::HTTP_OK);
    }

    // Si le tirage au sort est suffisant pour détruire le bouclier
    if ($diceRoll >= 4) {
        $entityManager->remove($shieldCard);
        $entityManager->flush();

        $remainingCards = $cardRepository->findBy(['sector' => $sector]);
        $allShieldsDestroyed = true;
        foreach ($remainingCards as $card) {
            if ($card->getType() === 'Bouclier') {
                $allShieldsDestroyed = false;
                break;
            }
        }

        if ($allShieldsDestroyed) {
            $entityManager->remove($sector);
            $entityManager->flush();
            return $this->json(['message' => 'Secteur détruit après destruction des boucliers.'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Bouclier détruit dans ce secteur.'], Response::HTTP_OK);
    }

    return $this->json(['message' => 'Échec de l\'attaque, bouclier non détruit.'], Response::HTTP_OK);
}
}