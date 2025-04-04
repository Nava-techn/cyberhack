<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: "App\Repository\CardRepository")]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["card:read", "sector:read"])]
    private $id;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(["card:read", "sector:read"])]
    private $type;

    #[ORM\Column(type: "boolean")]
    #[Groups(["card:read", "sector:read"])]
    private $isSpecial;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(["card:read", "sector:read"])]
    private $imageUrl;

    #[ORM\ManyToOne(targetEntity: "App\Entity\Sector", inversedBy: "cards")]
    #[Groups(["card:read"])] // Groupes associés à la lecture des cartes
    private $sector;

    // Ajout de la nouvelle propriété 'description'
    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(["card:read"])]  // Ajout du groupe pour la sérialisation
    private $description;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getIsSpecial(): ?bool
    {
        return $this->isSpecial;
    }

    public function setIsSpecial(bool $isSpecial): self
    {
        $this->isSpecial = $isSpecial;
        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;
        return $this;
    }

    public function getSector(): ?Sector
    {
        return $this->sector;
    }

    public function setSector(?Sector $sector): self
    {
        $this->sector = $sector;
        return $this;
    }

    // Getter et setter pour la propriété 'description'
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }
}
