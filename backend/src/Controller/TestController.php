<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/api/test/attaque/{id}', name: 'test_attaque')]
    public function testAttaque(int $id): JsonResponse
    {
        return $this->json([
            'message' => 'API fonctionnelle',
            'id' => $id
        ]);
    }
} 