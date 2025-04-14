<?php

namespace App\Repository;

use App\Entity\EventCard;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class EventCardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EventCard::class);
    }

    public function findRandomEventCard(): ?EventCard
    {
        $entityManager = $this->getEntityManager();

        $query = 'SELECT * FROM event_card ORDER BY RAND() LIMIT 1';
        $statement = $entityManager->getConnection()->prepare($query);
        
        // Exécuter la requête et récupérer le résultat sous forme de tableau associatif
        $result = $statement->executeQuery()->fetchAssociative();

        if ($result) {
            return $this->getEntityManager()->getReference(EventCard::class, $result['id']);
        }

        return null;
    }
}
