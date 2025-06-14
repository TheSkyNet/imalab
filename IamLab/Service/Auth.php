<?php

namespace IamLab\Service;


use IamLab\Core\API\aAPI;
use IamLab\Model\User;
use IamLab\Service\Auth\AuthService;
use function App\Core\Helpers\dd;

class Auth extends aAPI
{

    public function authAction()
    {

        $email = $this->getParam('email');
        $password = $this->getParam('password');


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
            // $this->response->redirect("/admin")->send();
            $this->dispatch($auth);
        }
        //$this->response->redirect("/auth")->send();
        $this->dispatch(false);

    }

    public function userAction()
    {

        if ((new AuthService())->isAuthenticated()) {
            $this->dispatch((new AuthService())->getIdentity());
        }
    }

    public function registerAction()
    {
        return;
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