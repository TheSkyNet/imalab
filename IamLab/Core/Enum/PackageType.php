<?php
namespace IamLab\Core\Enum;

use MabeEnum\Enum;

class PackageType extends Enum
{
  const COMPOSER = 1;
  const NPM      = 2;

  public function toString()
  {
    switch($this->getValue())
    {
      case 1:
        return 'COMPOSER';
        break;
      case 2:
        return 'NPM';
        break;
    }
  }
}