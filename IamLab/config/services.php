<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Micro;
use IamLab\Service\Auth\AuthService;
use Phalcon\Http\Response;
use Phalcon\Mvc\View\Simple;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Cache\Frontend\Data as FrontendData;
use Phalcon\Cache\Backend\Memcache as BackendMemcache;
use Phalcon\Db\Adapter\Pdo\Mysql;
use Phalcon\Session\Manager;
use Phalcon\Session\Adapter\Stream;
/**
 * Shared configuration service
 */
$di->setShared(
    'config',
    function () {
        return include  APP_PATH . "/config/config.php";
    }
);

/**
 * Shared loader service
 */
$di->setShared(
    'loader',
    function () {
        $loader = new \Phalcon\Autoload\Loader();
        $config = $this->getConfig();


        $loader->setDirectories(
            [
                $config->application->modelsDir,
            ]
        )->register();

        return $loader;
    }
);

/**
 * Sets the view component
 */
$di->set(
    'view',
    function () {
        $config = $this->getConfig();

        $view = new Simple();
        $view->setViewsDir($config->application->viewsDir);

        return $view;
    }
);

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->setShared(
    'url',
    function () {
        $config = $this->getConfig();

        $url = new UrlResolver();
        $url->setBaseUri($config->application->baseUri);

        return $url;
    }
);

/**
 * Database connection is created based in the parameters defined in the
 * configuration file
 */
$di->setShared(
    'db',
    function () {
        $config = $this->getConfig();

        $dbConfig = $config->database->toArray();
        return new Mysql(
            [
                'host'     => 'mysql',
                'username' => 'root',
                'password' => '',
                'dbname'   => 'databasename',
            ]
        );
    }
);
// Set the models cache service
$di->set(
    'modelsCache',
    function () {

        // Cache data for one day by default
        $frontCache = new FrontendData(
            [
                "lifetime" => 86400,
            ]
        );

        // Memcached connection settings
        $cache = new BackendMemcache(
            $frontCache,
            [
                "host" => "localhost",
                "port" => "11211",
            ]
        );

        return $cache;
    }
);

$di->setShared(
    'authService',
    function () {
        return new  AuthService();
    }
);
$di->setShared(
    'session',
    function () {

        $session = new Manager();
        $files = new Stream(
            [
                'savePath' => '/tmp',
            ]
        );
        $session->setAdapter($files);
        return $session;
    }
);

$di->setShared(
    'isAuthenticated',
    function () {
        if (!(new AuthService())->isAuthenticated()) {
            $response = new \Phalcon\Http\Response();
            $response->redirect('/auth');
            $response->send();

        }
        return true;
    }
);

