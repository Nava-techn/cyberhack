<?php
// src/Controller/GameController.php

namespace App\Controller;

use App\Service\GameService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    private $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }

    /**
     * @Route("/api/attack/{sector}/{diceScore}", name="attack_sector", methods={"POST"})
     */
    public function attackSector(string $sector, int $diceScore): JsonResponse
    {
        $result = $this->gameService->handleAttack($sector, $diceScore);

        return new JsonResponse([
            'message' => $result['message'],
            'shieldDestroyed' => $result['shieldDestroyed'],
            'sectorDestroyed' => $result['sectorDestroyed'],
        ]);
    }

    /**
     * @Route("/api/draw-event", name="draw_event", methods={"GET"})
     */
    public function drawEvent(): JsonResponse
    {
        $event = $this->gameService->drawEventCard();

        return new JsonResponse(['event' => $event]);
    }
}
