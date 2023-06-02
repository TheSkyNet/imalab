<?php

use Phalcon\Config\Config;

return new Config([
    'database' => [
        'adapter' => 'mysql',
        'host' => 'mysql',
        'username' => 'phalcons',
        'password' => 'phalcons',
        'dbname' => 'phalcons',
        'charset' => 'utf8',
    ],
    'application' => [
        'logInDb' => true,
        'no-auto-increment' => true,
        'skip-ref-schema' => true,
        'skip-foreign-checks' => true,
        'migrationsDir' => 'IamLab/Migrations/',
        'migrationsTsBased' => true, // true - Use TIMESTAMP as version name, false - use versions
        'exportDataFromTables' => [
            // Tables names
            // Attention! It will export data every new migration
        ],
    ],
]);