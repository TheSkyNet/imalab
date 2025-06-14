<?php
namespace IamLab\Core\Enum;

use Exception;
use MabeEnum\Enum;

class PackageType extends Enum
{
  const COMPOSER = 2;
  const NPM      = 1;
  const UNKNOWN  = 0;

  public function toString()
  {
      return match ($this->getValue()) {
          2, 0 => 'COMPOSER',
          1 => 'NPM',
          default => throw new Exception('Unexpected value'),
      };
  }
}