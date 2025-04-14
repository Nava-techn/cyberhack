<?php
namespace App\Controller\Api;

use App\Entity\EventCard;
use App\Repository\EventCardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class EventCardController extends AbstractController
{
    #[Route('/api/event-card/random', name: 'api_event_card_random', methods: ['GET'])]
    public function getRandomEventCard(EventCardRepository $eventCardRepository): JsonResponse
    {
        $eventCard = $eventCardRepository->findRandomEventCard();

        if (!$eventCard) {
            return new JsonResponse(['error' => 'No event card found'], JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json($eventCard, 200, [], ['groups' => 'event_card:read']);
    }

    #[Route('/api/event-card', name: 'api_event_card_create', methods: ['POST'])]
    public function createEventCard(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (!isset($data['name']) || !isset($data['description'])) {
            return new JsonResponse(['error' => 'Missing required fields'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $eventCard = new EventCard();
        $eventCard->setName($data['name']);
        $eventCard->setDescription($data['description']);

        $file = $request->files->get('image_url');
        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

            try {
                $file->move(
                    $this->getParameter('images_directory'),
                    $newFilename
                );
                $eventCard->setImageUrl('/images/' . $newFilename);
            } catch (FileException $e) {
                return new JsonResponse(['error' => 'File upload failed'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $em->persist($eventCard);
        $em->flush();

        return $this->json($eventCard, 201, [], ['groups' => 'event_card:read']);
    }
}
