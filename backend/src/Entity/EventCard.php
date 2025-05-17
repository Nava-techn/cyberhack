<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: "App\Repository\EventCardRepository")]
class EventCard
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["event_card:read"])]
    private $id;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(["event_card:read"])]
    private $name;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(["event_card:read"])]
    private $imageUrl;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(["event_card:read"])]
    private $description;

    // Getters and Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
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
