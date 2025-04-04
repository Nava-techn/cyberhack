<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection; // Ajoutez cette ligne
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: "App\Repository\SectorRepository")]
class Sector
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["sector:read", "card:read"])]
    private $id;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(["sector:read", "card:read"])]
    private $symbol;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(["sector:read", "card:read"])]
    private $image;

    #[ORM\OneToMany(mappedBy: "sector", targetEntity: "App\Entity\Card")]
    #[Groups(["sector:read"])]
    private $cards;

    public function __construct()
    {
        $this->cards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSymbol(): ?string
    {
        return $this->symbol;
    }

    public function setSymbol(string $symbol): self
    {
        $this->symbol = $symbol;
        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function getCards(): ?ArrayCollection
    {
        return $this->cards;
    }

    public function addCard(Card $card): self
    {
        if (!$this->cards->contains($card)) {
            $this->cards[] = $card;
            $card->setSector($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->cards->removeElement($card)) {
            if ($card->getSector() === $this) {
                $card->setSector(null);
            }
        }

        return $this;
    }
}
