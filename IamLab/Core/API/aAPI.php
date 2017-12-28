<?php

namespace IamLab\Core\API;

use Phalcon\Mvc\User\Component;

abstract class aAPI extends Component
{
  protected function dispatch($data)
  {
    $this->response->setContentType('application/json', 'UTF-8');
    $this->response->setContent(json_encode($data));
    $this->response->send();
  }
}