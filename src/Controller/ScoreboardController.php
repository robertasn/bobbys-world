<?php

namespace App\Controller;

use App\Entity\ScoreBoard;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScoreboardController extends AbstractController
{
    /**
     * @Route("/scoreboard", name="scoreboard")
     */
    public function index()
    {
        return $this->render('scoreboard/index.html.twig', [
            'times' => $this->getDoctrine()->getRepository(ScoreBoard::class)->findBy([], ["time" => "ASC"]),
        ]);
    }

    /**
     * @Route("/submit", name="submit")
     */
    public function submit(Request $request, EntityManagerInterface $em)
    {
        $scoreboard = new ScoreBoard();
        $scoreboard->setUser($this->getUser());
        $scoreboard->setTime($request->getContent());
        $em->persist($scoreboard);
        $em->flush();
        return new Response();
    }

    /**
     * @Route("/konami", name="konami")
     */
    public function konami()
    {
        if (sizeof($this->getUser()->getScoreboards()) == 0) {
            throw new AccessDeniedException("Pls dont hack");
        }
        return $this->render('scoreboard/konami.html.twig');
    }
}
