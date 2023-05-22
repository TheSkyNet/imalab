<?php

/**
 * Created by PhpStorm.
 * User: Kevin
 * Date: 22/10/2015
 * Time: 19:05
 */
namespace IamLab\Service\Auth;

use IamLab\Core\API\aAPI;
use IamLab\Model\User;
use Phalcon\Mvc\User\Component;

class AuthService extends aAPI
{
  public $isAuthenticated;
  public $state;

  public function isAuthenticated()
  {
    return (bool)$this->getIdentity();
  }

  /**
   * @return mixed
   */
  public function getUser()
  {
    $identity = $this->getIdentity();
    $user = User::findFirstById(
        $identity['id']
    );

    return $user;
  }

  public function authenticate(User $user, $authMethod = "post")
  {

    if ($authMethod == "post") {

      return $this->authenticatePost($user);
    }

    return false;
  }

  private function authenticatePost(User $user)
  {

    $password = $user->getPassword();
    $user = User::findFirst("email='{$user->getEmail()}'");
    if (!$user) {
      return false;
    }

    if (password_verify($password, $user->getPassword())) {
      $this->setIdentity($user);

      return true;
    }
    return false;
  }

  private function setIdentity($user)
  {

    $this->session->set(
        'auth-identity',
        [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]
    );
  }

  private function getIdentity()
  {
    return $this->session->get('auth-identity');
  }

  public function deauthenticate()
  {
    $this->session->destroy();
  }

  /**
   * @param User $user
   *
   * @return bool
   */
  public function register(User $user)
  {
    $user->setPassword(
        password_hash(
            $user->getPassword(),
            PASSWORD_DEFAULT
        )
    );

    if (!$user->validation())
    {
      return false;
    }

    $userFind = User::findFirstByEmail(
        $user->getEmail()
    );

    if (!empty($userFind->id))
    {
      return false;
    }

    if ($user->save() == false)
    {
      dump($user->getMessages());
      return false;

    }

    $this->setIdentity($user);

    return true;
  }
}