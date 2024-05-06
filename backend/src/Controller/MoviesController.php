<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/movies', methods: ['GET'])]
public function list(Request $request): JsonResponse
{
    $sortBy = $request->query->get('sort');
    $genre = $request->query->get('genre');
    $rating = $request->query->get('rating');

    $queryBuilder = $this->movieRepository->createQueryBuilder('m')
        ->leftJoin('m.movieGenres', 'mg')
        ->leftJoin('mg.genre', 'g');  

    if ($genre) {
        $queryBuilder->andWhere('g.id = :genreId')  
                     ->setParameter('genreId', $genre);
    }

    if ($rating) {
    $queryBuilder->andWhere('m.rating = :rating')
                 ->setParameter('rating', $rating);
}


    if ($sortBy) {
        switch ($sortBy) {
            case 'recent':
                $queryBuilder->orderBy('m.releaseDate', 'DESC');
                break;
            case 'rating':
                $queryBuilder->orderBy('m.rating', 'DESC');
                break;
        }
    }

    $movies = $queryBuilder->getQuery()->getResult();
    $data = $this->serializer->serialize($movies, 'json', ['groups' => 'default']);

    return new JsonResponse($data, json: true);
}

    
}