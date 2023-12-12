<?php

namespace App\Administration\Controller;

use App\Administration\Entity\Admquote;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdmquoteController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    #[Route(path: '/', name: 'admin_quote_index', methods: ['GET', 'POST'])]
    public function index(): Response
    {
        $admquotes = $this->em->getRepository(Admquote::class)->findBy([], ['id' => 'ASC']);

        return $this->render('administration/admquote.html.twig', ['admquotes' => $admquotes]);
    }

    #[Route(path: '/{id}', name: 'admin_quote_edit', methods: ['GET', 'POST'])]
    public function edit(admquote $admquote): Response
    {
        return $this->render('common/form_edit.html.twig', [
            'formComponentName' => 'AdmQuoteFormComponent',
            'componentProps' => [
                'initialFormData' => $admquote,
            ],
        ]);
    }
}
