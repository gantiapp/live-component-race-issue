<?php

namespace App\Core\Trait;

trait FormComponentTrait
{
    public function hasValidationErrors(): bool
    {
        return $this->getForm()->isSubmitted() && !$this->getForm()->isValid();
    }
}
