<?php

defined('APP_PATH') || define('APP_PATH', realpath('./IamLab'));

return new \Phalcon\Config([
    'database' => [
        'adapter'    => 'Mysql',
        'host'       => 'localhost',
        'username'   => 'root',
        'password'   => 'JP)(2407d',
        'dbname'     => 'iamlab',
    ],

    'application' => [
        'modelsDir'      => APP_PATH . '/Model/',
        'controllersDir'      => APP_PATH . '/Service/',
        'migrationsDir'  => APP_PATH . '/Migrations/',
        'viewsDir'       => APP_PATH . '/views/',
        'baseUri'        => '/',
    ]
]);
