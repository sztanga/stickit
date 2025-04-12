<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Entity\Note;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class NoteControllerTest extends WebTestCase
{
    public function testList(): void
    {
        $client = static::createClient();
        $user = $this->createUser($client);
        $client->loginUser($user);

        $client->request('GET', '/api/notes');
        $this->assertResponseIsSuccessful();
    }

    public function testCreateNote(): void
    {
        $client = static::createClient();
        $user = $this->createUser($client);
        $client->loginUser($user);

        $client->jsonRequest('POST', '/api/notes', [
            'content' => 'My first note',
            'color' => '#ffff00',
            'depth' => 1,
            'positionX' => 50,
            'positionY' => 60,
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertStringContainsString('Note created', $client->getResponse()->getContent());
    }

    public function testUpdateNote(): void
    {
        $client = static::createClient();
        $user = $this->createUser($client);
        $client->loginUser($user);

        $note = new Note();
        $note->setUser($user)
            ->setColor('#ffcc00')
            ->setContent('original')
            ->setPositionX(10)
            ->setPositionY(20)
            ->setDepth(0);

        $em = self::getContainer()->get('doctrine')->getManager();
        $em->persist($note);
        $em->flush();

        $client->jsonRequest('PUT', "/api/notes/{$note->getId()}", [
            'content' => 'updated',
            'color' => '#000000',
            'positionX' => 100,
            'positionY' => 150,
            'depth' => 1
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertStringContainsString('Note updated', $client->getResponse()->getContent());
    }

    public function testDeleteNote(): void
    {
        $client = static::createClient();
        $user = $this->createUser($client);
        $client->loginUser($user);

        $note = new Note();
        $note->setUser($user)
            ->setColor('#eeeeee')
            ->setContent('to delete')
            ->setPositionX(1)
            ->setPositionY(2)
            ->setDepth(0);

        $em = self::getContainer()->get('doctrine')->getManager();
        $em->persist($note);
        $em->flush();

        $client->request('DELETE', "/api/notes/{$note->getId()}");

        $this->assertResponseIsSuccessful();
        $this->assertStringContainsString('Note deleted', $client->getResponse()->getContent());
    }

    public function testUpdateNoteNotFound(): void
    {
        $client = static::createClient();
        $user = $this->createUser($client);
        $client->loginUser($user);

        $client->request('PUT', '/api/notes/999999', [], [], [], json_encode([]));

        $this->assertResponseStatusCodeSame(404);
    }

    public function testDeleteNoteUnauthorized(): void
    {
        $client = static::createClient();
        $client->request('DELETE', '/api/notes/1');

        $this->assertResponseStatusCodeSame(401);
    }

    private function createUser($client): User
    {
        $user = new User();
        $user->setEmail('test_' . uniqid() . '@mail.com');

        $hasher = self::getContainer()->get(UserPasswordHasherInterface::class);
        $user->setPassword($hasher->hashPassword($user, 'test1234'));

        $em = self::getContainer()->get('doctrine')->getManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }
}
