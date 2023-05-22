<?php

namespace IamLab\Service;

use IamLab\Model\User;
use IamLab\Service\Auth\AuthService;

class Auth extends Component
{

  public function authAction()
  {

    $email = $this->request->getPost('email');
    $password = $this->request->getPost('password');

    $auth = (new AuthService())
        ->authenticate(
            (new User())
                ->setEmail(
                    $email
                )
                ->setPassword(
                    $password
                )
        );

    if ($auth) {
      $this->response->redirect("/admin")->send();
      return;
    }

    $this->response->redirect("/auth")->send();
    return;

  }

  public function registerAction()
  {
    $email = $this->request->getPost('email');
    $password = $this->request->getPost('password');
    (new AuthService())->register(
        (new User())
            ->setName(
                $email
            )
            ->setEmail(
                $email
            )
            ->setPassword(
                $password
            )
    );
  }
}