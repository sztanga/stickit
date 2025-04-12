<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthControllerTest extends WebTestCase
{
    public function testRegisterMissingFields(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/register', []);
        $this->assertResponseStatusCodeSame(400);
    }

    public function testRegisterValidUser(): void
    {
        $client = static::createClient();
        $email = 'user' . uniqid() . '@test.com';

        $client->jsonRequest('POST', '/api/register', [
            'email' => $email,
            'password' => 'test1234'
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertStringContainsString('User registered successfully', $client->getResponse()->getContent());
    }

    public function testRegisterDuplicateEmail(): void
    {
        $client = static::createClient();
        $email = 'duplicate' . uniqid() . '@test.com';

        $client->jsonRequest('POST', '/api/register', [
            'email' => $email,
            'password' => 'pass123'
        ]);

        $client->jsonRequest('POST', '/api/register', [
            'email' => $email,
            'password' => 'pass123'
        ]);

        $this->assertResponseStatusCodeSame(400);
        $this->assertStringContainsString('Email already exists', $client->getResponse()->getContent());
    }

    public function testLogout(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/logout');

        $this->assertResponseIsSuccessful();
        $this->assertStringContainsString('Logged out', $client->getResponse()->getContent());
    }

    public function testMeUnauthorized(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/me');

        $this->assertResponseStatusCodeSame(401);
        $this->assertStringContainsString('JWT Token not found', $client->getResponse()->getContent());
    }
}
