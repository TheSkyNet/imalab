<?php

namespace IamLab\Service;

use Phalcon\Mvc\User\Component;

/**
 * @property void isAuthenticated
 */
class Admin extends Component
{


  function indexAction()
  {
    //$this->isAuthenticated;

    echo $this->view->render('admin');

  }


}