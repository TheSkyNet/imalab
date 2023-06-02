<?php

namespace App\Core\Helpers;
use Defuse\Crypto\Crypto;
use Exception;
use RangeException;
use SodiumException;

/**
 * @throws SodiumException
 * @throws Exception
 */
function crypt(string $message): string
{
    $key = config('encryption_key');
    $plaintext = Crypto::encrypt($message, $key);;
    return $plaintext;
}

/**
 * Decrypt a message
 *
 * @param string $encrypted - message encrypted with safeEncrypt()
 * @param string $key - encryption key
 * @return string
 * @throws Exception
 * @throws SodiumException
 */
function decrypt(string $encrypted ): string
{
    $key = config('encryption_key');
    $plaintext = Crypto::decrypt($encrypted, $key);;
    return $plaintext;
}
