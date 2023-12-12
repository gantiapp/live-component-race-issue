<?php

namespace App\Administration\Entity;

use App\Administration\Repository\AdmquoteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdmquoteRepository::class)]
class Admquote
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 5)]
    private ?string $lang = null;

    #[ORM\Column(type: 'string', length: 4000)]
    private ?string $quote = null;

    #[ORM\Column(type: 'string', length: 50)]
    private ?string $author = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLang(): ?string
    {
        return $this->lang;
    }

    public function setLang(string $lang): void
    {
        $this->lang = $lang;
    }

    public function getQuote(): ?string
    {
        return $this->quote;
    }

    public function setQuote(string $quote): void
    {
        $this->quote = $quote;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }
}
