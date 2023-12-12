<?php

namespace App\Administration\Component;

use App\Administration\Entity\Admquote;
use App\Administration\Form\AdmquoteType;
use App\Core\Trait\FormComponentTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\TwigComponent\Attribute\PreMount;

#[AsLiveComponent(template: 'components/_form.html.twig')]
class AdmQuoteFormComponent extends AbstractController
{
    use ComponentWithFormTrait;
    use DefaultActionTrait;
    use FormComponentTrait;

    #[LiveProp]
    public ?Admquote $initialFormData = null;

    public function __construct(
        private readonly EntityManagerInterface $em
    ) {
    }

    /**
     * @param array<string, mixed> $data
     *
     * @return array<string, mixed>
     */
    #[PreMount]
    public function preMount(array $data): array
    {
        if (!isset($data['initialFormData'])) {
            $data['initialFormData'] = new Admquote();
        }

        return $data;
    }

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(AdmquoteType::class, $this->initialFormData);
    }

    #[LiveAction]
    public function save(): Response
    {
        $this->submitForm();
        $form = $this->getForm();

        /** @var Admquote $admQuote */
        $admQuote = $form->getData();

        if (!$this->em->contains($admQuote)) {
            $this->em->persist($admQuote);
            $this->em->flush();

            $this->addFlash('success', 'The quote has been successfully created');

            return $this->redirectToRoute('admin_quote_index');
        }

        $this->em->flush();

        $this->addFlash('success', 'The quote has been successfully updated');

        return $this->redirectToRoute('admin_quote_index');
    }
}
