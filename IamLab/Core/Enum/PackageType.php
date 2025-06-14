<?php
namespace IamLab\Core\Enum;

use MabeEnum\Enum;

class PackageType extends Enum
{
  const COMPOSER = 2;
  const NPM      = 1;

  public function toString()
  {
      return match ($this->getValue()) {
          2 => 'COMPOSER',
          1 => 'NPM',
          default => throw new \Exception('Unexpected value'),
      };
  }
}