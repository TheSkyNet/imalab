<?php

defined('APP_PATH') || define('APP_PATH', realpath('./IamLab'));
defined('TMP_PATH') || define('TMP_PATH', sys_get_temp_dir());
defined('FILE_PATH') || define('FILE_PATH', realpath('./files/public'));

return new \Phalcon\Config\Config([
    'app' => [
        'encryption_key' => App\Core\Helpers\env('APP_KEY', 'phalcon'),
        'baseUri' => App\Core\Helpers\env('APP_BASE_URI'),
        'env' => App\Core\Helpers\env('APP_ENV'),
        'name' => App\Core\Helpers\env('APP_NAME'),
        'timezone' => App\Core\Helpers\env('APP_TIMEZONE'),
        'url' => App\Core\Helpers\env('APP_URL'),
        'version' => App\Core\Helpers\env('VERSION'),
        'time' => microtime(true),
    ],
    'database' => [
        'adapter' => 'Mysql',
        'host' => App\Core\Helpers\env('DB_HOST', 'mysql'),
        'username' => App\Core\Helpers\env('DB_USERNAME', 'phalcons'),
        'password' => App\Core\Helpers\env('DB_PASSWORD', 'phalcons'),
        'dbname' => App\Core\Helpers\env('DB_NAME', 'phalcons'),
    ],

    'application' => [
        'modelsDir' => APP_PATH . '/Model/',
        'controllersDir' => APP_PATH . '/Service/',
        'migrationsDir' => APP_PATH . '/Migrations/',
        'viewsDir' => APP_PATH . '/views/',
        'baseUri' => '/',
    ],
    'redis' => [
        'host' => App\Core\Helpers\env('REDIS_HOST', 'redis'),
        'port' => App\Core\Helpers\env('REDIS_PORT', 6379),
        'password' => App\Core\Helpers\env('REDIS_PASSWORD', ''),
        'timeout' => App\Core\Helpers\env('REDIS_TIMEOUT', 0),
        'persistent' => App\Core\Helpers\env('REDIS_PERSISTENT', false),
        'database' => App\Core\Helpers\env('REDIS_DATABASE', 0),
        'prefix' => App\Core\Helpers\env('REDIS_PREFIX', ''),

        'lifetime' => App\Core\Helpers\env('REDIS_LIFETIME', 0),
        'retryInterval' => App\Core\Helpers\env('REDIS_RETRYINTERVAL', 0),
        'maxTries' => App\Core\Helpers\env('REDIS_MAXTRIES', 0),
        'usePipeline' => App\Core\Helpers\env('REDIS_USEPIPELINE', false),
        'useCluster' => App\Core\Helpers\env('REDIS_USECLUSTER', false),
        'clusterNodes' => App\Core\Helpers\env('REDIS_CLUSTERNODES', ''),
        'failover' => App\Core\Helpers\env('REDIS_FAILOVER', false),
        'maxRedirects' => App\Core\Helpers\env('REDIS_MAXREDIRECTS', 0),
        'readOnly' => App\Core\Helpers\env('REDIS_READONLY', false),
    ],

    'session' => [
        'adapter' => 'Files',
        'lifetime' => 3600,
        'path' => '/tmp',
        'domain' => null,
        'secure' => false,
        'httponly' => true,
        'name' => 'PHPSESSID',
        'autorefresh' => true,
        'savePath' => null,
    ],

    'logger' => [
    ],
    'filepond' => [
        'temp_folder' => App\Core\Helpers\env('FILEPOND_TEMP_FOLDER', '/tmp'),
        'temp_disk' => App\Core\Helpers\env('FILEPOND_TEMP_DISK', 'local'),
        'disk' => App\Core\Helpers\env('FILEPOND_DISK', 'local'),

    ]


]);


