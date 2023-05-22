<?php

namespace IamLab\Core\API;

abstract class aAPI extends \Phalcon\Di\Injectable
{
  protected function dispatch($data)
  {
    $this->response->setContentType('application/json', 'UTF-8');
    $this->response->setContent(json_encode($data));
    $this->response->send();
  }
}