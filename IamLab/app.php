<?php
/**
 * Local variables
 *
 * @var \Phalcon\Mvc\Micro $app
 */
use IamLab\Service\Admin;
use IamLab\Service\API;
use IamLab\Service\Auth;

/**
 * Add your routes here
 */

$app->get(
  '/',
  function () use ($app)
  {
    echo $app['view']->render('index');
  }
);

/*
 * API
 */
$app->get('/api/v1/all', [(new API), "getAllAction"]);
$app->get('/api/v1/post', [(new API), "getPostsAction"]);
$app->get('/api/v1/post/{id}', [(new API), "getPostsByIdAction"]);
$app->post('/api/v1/post', [(new API), "newPostAction"]);
$app->put('/api/v1/post/{id}', [(new API), "updatePostsAction"]);

$app->get('/api/v1/package', [(new API), "getPackageAction"]);
$app->get('/api/v1/package/{id}', [(new API), "getPackageByIdAction"]);
$app->post('/api/v1/package', [(new API), "newPackageAction"]);
$app->put('/api/v1/package/{id}', [(new API), "updatePackageAction"]);

$app->get('/api/v1/project', [(new API), "getProjectAction"]);
$app->get('/api/v1/project/{id}', [(new API), "getProjectByIdAction"]);
$app->post('/api/v1/project', [(new API), "newProjectAction"]);
$app->put('/api/v1/project/{id}', [(new API), "updateProjectAction"]);

/*
 * Admin
 */
$app->get('/admin', [(new Admin()), "indexAction"]);#

/*
 *
 */

$app->get(
  '/auth',
  function () use ($app)
  {
    echo $app['view']->render('auth');
  }
);
$app->post('/auth', [(new Auth()), "authAction"]);
/**
 * Not found handler
 */
$app->notFound(
  function () use ($app)
  {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo $app['view']->render('404');
  }
);
