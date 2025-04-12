<?php

namespace App\Tests\Entity;

use App\Entity\Note;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class NoteTest extends TestCase
{
    public function testNoteProperties(): void
    {
        $note = new Note();
        $user = new User();

        $note->setContent('Test note');
        $note->setColor('#ffaa00');
        $note->setPositionX(100);
        $note->setPositionY(200);
        $note->setDepth(1);
        $note->setUser($user);

        $this->assertNull($note->getId());
        $this->assertSame('Test note', $note->getContent());
        $this->assertSame('#ffaa00', $note->getColor());
        $this->assertSame(100, $note->getPositionX());
        $this->assertSame(200, $note->getPositionY());
        $this->assertSame(1, $note->getDepth());
        $this->assertSame($user, $note->getUser());
    }
}
