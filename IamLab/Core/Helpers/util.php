<?php

namespace App\Core\Helpers;
/** @var \Phalcon\Di\FactoryDefault $di */

function config($key,  $default = null){
    return di('config')->get($key)->toArray();
}
function di($service){

    global $di;
    return  $di->get($service);
}

function env($key,  $default = null){
    return getenv($key) ?: $default;
}
function dd(...$variable){
    echo '<pre>';
    die(var_dump($variable));
    echo '</pre>';
}