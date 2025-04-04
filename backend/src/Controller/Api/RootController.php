<?php
namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/')]
class RootController extends AbstractController
{
    #[Route('/', name: 'api_home', methods: ['GET'])]
    public function home(): Response
    {
        return $this->redirect('/api/start-game');
    }
}

