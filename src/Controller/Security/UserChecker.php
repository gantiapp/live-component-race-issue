<?php

namespace App\Controller\Security;

use App\Administration\Entity\Admuser;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user)
    {
        if (!$user instanceof Admuser) {
            return;
        }

        // user is deleted, show a generic Account Not Found message.
        if (!$user->getEnabled()) {
            // or to customize the message shown
            throw new CustomUserMessageAuthenticationException('Your account has been disabled. Sorry about that!');
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof Admuser) {
            return;
        }
    }
}
