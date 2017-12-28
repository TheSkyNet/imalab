<?php

use IamLab\Service\Auth\AuthService;
use Phalcon\Http\Response;
use Phalcon\Mvc\View\Simple as View;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Cache\Frontend\Data as FrontendData;
use Phalcon\Cache\Backend\Memcache as BackendMemcache;

/**
 * Shared configuration service
 */
$di->setShared(
  'config',
  function ()
  {
    return include __DIR__ . "/../config/config.php";
  }
);

/**
 * Shared loader service
 */
$di->setShared(
  'loader',
  function ()
  {
    $loader = new \Phalcon\Loader();
    $config = $this->getConfig();
    $loader->registerDirs(
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
$di->setShared(
  'view',
  function ()
  {
    $config = $this->getConfig();

    $view = new View();
    $view->setViewsDir($config->application->viewsDir);

    return $view;
  }
);

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->setShared(
  'url',
  function ()
  {
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
  function ()
  {
    $config = $this->getConfig();

    $dbConfig = $config->database->toArray();
    $adapter = $dbConfig['adapter'];
    unset($dbConfig['adapter']);

    $class = "Phalcon\\Db\\Adapter\\Pdo\\{$adapter}";

    return new $class($dbConfig);
  }
);
// Set the models cache service
$di->set(
  'modelsCache',
  function ()
  {

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
  function ()
  {
    return new  AuthService();
  }
);
$di->setShared(
  'session',
  function () 
  {
    $session = new Phalcon\Session\Adapter\Files(
      [
        'uniqueId' => 'my-private-app',
      ]
    );
    $session->start();

    return $session;
  }
);
$di->setShared(
  'isAuthenticated',
  function ()
  {
    if ((new AuthService())->isAuthenticated())
    {
      return true;
    }
    else
    {
      $response = new Response();
      $response->redirect('/auth');
      $response->send();

      return true;
    }
  }
);