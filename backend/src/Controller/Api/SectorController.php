<?php
namespace App\Controller\Api;

use App\Entity\Sector;
use App\Repository\SectorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class SectorController extends AbstractController
{
    // Affiche tous les secteurs
    #[Route('/sectors', name: 'api_sectors_list', methods: ['GET'])]
    public function list(SectorRepository $sectorRepository, SerializerInterface $serializer): JsonResponse
    {
        $sectors = $sectorRepository->findAll();

        if (empty($sectors)) {
            return $this->json(['message' => 'Aucun secteur disponible.'], Response::HTTP_NOT_FOUND);
        }

        $data = $serializer->serialize($sectors, 'json', ['groups' => ['sector:read']]);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    // Affiche un secteur spécifique
    #[Route('/sectors/{id}', name: 'api_sector_show', methods: ['GET'])]
    public function show(int $id, SectorRepository $sectorRepository, SerializerInterface $serializer): JsonResponse
    {
        $sector = $sectorRepository->find($id);

        if (!$sector) {
            return $this->json(['message' => 'Secteur non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        $data = $serializer->serialize($sector, 'json', ['groups' => ['sector:read']]);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }
}
