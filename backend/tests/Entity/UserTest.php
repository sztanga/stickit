<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testUserProperties(): void
    {
        $user = new User();

        $user->setEmail('test@example.com');
        $user->setPassword('hashedpassword');
        $user->setRoles(['ROLE_ADMIN']);

        $this->assertNull($user->getId());
        $this->assertSame('test@example.com', $user->getEmail());
        $this->assertSame('test@example.com', $user->getUserIdentifier());
        $this->assertContains('ROLE_ADMIN', $user->getRoles());
        $this->assertContains('ROLE_USER', $user->getRoles());
        $this->assertSame('hashedpassword', $user->getPassword());

        $this->assertCount(0, $user->getNotes());
    }
}
