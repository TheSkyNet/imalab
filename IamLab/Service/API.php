<?php

namespace IamLab\Service;

use IamLab\Core\API\aAPI;
use IamLab\Model\Package;
use IamLab\Model\Post;
use IamLab\Model\Project;

/**
 * @property void isAuthenticated
 */
class API extends aAPI
{
    public function getAllAction()
    {
        $posts = Post::find();
        $packages = Package::find();
        $project = Project::find();
        $all = [];


        $all = array_merge(
            $all,
            $posts->toArray(),
            $packages->toArray(),
            $project->toArray());
        shuffle($all);
        $this->dispatch($all);
    }

    public function getPostsAction()
    {
        $posts = Post::find();
        $this->dispatch($posts);
    }


    public function getPostsByIdAction($id)
    {
        $posts = Post::findFirstById($id);
        $this->dispatch($posts);
    }

    public function newPostAction()
    {
        $this->isAuthenticated;
        $posts = (new Post())->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }

    public function updatePostsAction($id)
    {
        $this->isAuthenticated;
        $posts = Post::findFirstById($id)->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }

    public function getPackageAction()
    {
        $posts = Package::find();
        $this->dispatch($posts);
    }

    public function getPackageByIdAction($id)
    {
        $posts = Package::findFirstById($id);
        $this->dispatch($posts);
    }

    public function newPackageAction()
    {
        $this->isAuthenticated;
        $posts = (new Package())->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }

    public function updatePackageAction($id)
    {
        $this->isAuthenticated;
        $posts = Package::findFirstById($id)->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }

    public function getProjectAction()
    {
        $posts = Project::find();
        $this->dispatch($posts);
    }

    public function getProjectByIdAction($id)
    {
        $posts = Project::findFirstById($id);
        $this->dispatch($posts);
    }

    public function newProjectAction()
    {
        $this->isAuthenticated;
        $posts = (new Project())->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }

    public function updateProjectAction($id)
    {
        $posts = Project::findFirstById($id)->setImg(
            $this->request->getPost('img')
        )->setTitle(
            $this->request->getPost('title')
        )->setBody(
            $this->request->getPost('body')
        )->save();
        $this->dispatch($posts);
    }
}