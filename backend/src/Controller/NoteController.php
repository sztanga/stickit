<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;

#[Route('/api/notes')]
class NoteController extends AbstractController
{
    #[Route('', name: 'notes_list', methods: ['GET'])]
    public function list(NoteRepository $noteRepository): JsonResponse
    {
        $notes = $noteRepository->findAll();

        $data = array_map(function (Note $note) {
            return [
                'id' => $note->getId(),
                'content' => $note->getContent(),
                'color' => $note->getColor(),
                'positionX' => $note->getPositionX(),
                'positionY' => $note->getPositionY(),
                'depth' => $note->getDepth(),
                'user' => $note->getUser()->getEmail(),
            ];
        }, $notes);

        return $this->json($data);
    }

    #[Route('', name: 'note_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        Security $security
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $note = new Note();
        $note->setContent($data['content'] ?? '');
        $note->setColor($data['color'] ?? '#FFFF00');
        $note->setPositionX($data['positionX'] ?? 0);
        $note->setPositionY($data['positionY'] ?? 0);
        $note->setDepth($data['depth'] ?? 1);
        $note->setUser($security->getUser());

        $em->persist($note);
        $em->flush();

        return $this->json(['message' => 'Note created', 'id' => $note->getId()], 201);
    }

    #[Route('/{id}', name: 'note_update', methods: ['PUT'])]
    public function update(
        int $id,
        Request $request,
        NoteRepository $noteRepository,
        EntityManagerInterface $em,
        Security $security
    ): JsonResponse {
        $note = $noteRepository->find($id);

        if (!$note) {
            return $this->json(['error' => 'Note not found'], 404);
        }

        if ($note->getUser() !== $security->getUser()) {
            return $this->json(['error' => 'Access denied'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $note->setContent($data['content'] ?? $note->getContent());
        $note->setColor($data['color'] ?? $note->getColor());
        $note->setPositionX($data['positionX'] ?? $note->getPositionX());
        $note->setPositionY($data['positionY'] ?? $note->getPositionY());
        $note->setDepth($data['depth'] ?? $note->getDepth());

        $em->flush();

        return $this->json(['message' => 'Note updated']);
    }

    #[Route('/{id}', name: 'note_delete', methods: ['DELETE'])]
    public function delete(
        int $id,
        NoteRepository $noteRepository,
        EntityManagerInterface $em,
        Security $security
    ): JsonResponse {
        $note = $noteRepository->find($id);

        if (!$note) {
            return $this->json(['error' => 'Note not found'], 404);
        }

        if ($note->getUser() !== $security->getUser()) {
            return $this->json(['error' => 'Access denied'], 403);
        }

        $em->remove($note);
        $em->flush();

        return $this->json(['message' => 'Note deleted']);
    }
}
