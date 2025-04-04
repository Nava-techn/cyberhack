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

    /**
     * Récupère un nombre donné de cartes événements de manière aléatoire.
     */
    public function findRandomCards(int $count): array
    {
        return $this->createQueryBuilder('e')
            ->addSelect('RAND() as HIDDEN rand')
            ->orderBy('rand')
            ->setMaxResults($count)
            ->getQuery()
            ->getResult();
    }
}
