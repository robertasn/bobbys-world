<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("bonus", name="bonus")
     */
    public function bonus()
    {
        if (sizeof($this->getUser()->getScoreboards()) == 0) {
            throw new AccessDeniedException("Pls dont hack");
        }
        return $this->forward("App\Controller\DefaultController:index");
    }
}
