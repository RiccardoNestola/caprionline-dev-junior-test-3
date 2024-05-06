<?php

namespace App\Controller;

use App\Repository\GenreRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GenreController extends AbstractController
{
    

    public function __construct(
        private GenreRepository $genreRepository)
    {
        $this->genreRepository = $genreRepository;
    }

    #[Route('/genres', name: 'get_genres', methods: ['GET'])]
    public function getGenres(): JsonResponse
    {
        $genres = $this->genreRepository->findAll();
        $data = [];

        foreach ($genres as $genre) {
            $data[] = [
                'id' => $genre->getId(),
                'name' => $genre->getName()
            ];
        }

        return new JsonResponse($data);
    }
}

?>