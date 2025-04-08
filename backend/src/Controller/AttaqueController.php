<?php

namespace App\Controller;

use App\Entity\Attaque;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AttaqueController extends AbstractController
{
    #[Route('/api/attaque/{id}', name: 'get_attaque', methods: ['GET'])]
    public function getAttaque(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $attaqueRepo = $entityManager->getRepository(Attaque::class);
        
        // Récupérer l'attaque demandée
        $attaque = $attaqueRepo->find($id);
        
        if (!$attaque) {
            return $this->json(['error' => 'Attaque non trouvée'], 404);
        }

        // Récupérer deux autres attaques aléatoires pour les propositions
        $qb = $attaqueRepo->createQueryBuilder('a')
            ->where('a.id_attaque != :id')
            ->setParameter('id', $id)
            ->orderBy('RAND()')
            ->setMaxResults(2);
        
        $autresAttaques = $qb->getQuery()->getResult();
        
        // Créer le tableau des propositions
        $propositions = array_map(function($a) {
            return $a->getNom();
        }, $autresAttaques);
        $propositions[] = $attaque->getNom();
        
        // Mélanger les propositions
        shuffle($propositions);

        return $this->json([
            'id_attaque' => $attaque->getIdAttaque(),
            'nom' => $attaque->getNom(),
            'description' => $attaque->getDescription(),
            'secteur_cible' => $attaque->getSecteurCible(),
            'propositions' => $propositions
        ]);
    }
} 