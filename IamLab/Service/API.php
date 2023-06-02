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

        $this->dispatch([$posts, $packages, $project]);
    }

    public function getPostsAction()
    {
        $posts = Post::find();
        $this->dispatch($posts);
    }


    public function getPostsByIdAction(int $id)
    {
        $posts = Post::findFirstById($id);
        $this->dispatch($posts);
    }

    public function deleteProjectAction(int $id)
    {
        $project = Project::findFirstById($id);

        $this->delete($project);
    }

    public function deletePostsAction(int $id)
    {
        $post = Post::findFirstById($id);

        $this->delete($post);
    }

    public function deletePackageAction(int $id)
    {
        $post = Post::findFirstById($id);

        $this->delete($post);
    }

    public function newPostAction()
    {
//       / $this->isAuthenticated;
        $posts = (new Post())->setImg(
            $this->getParam('img')
        )->setTitle(
            $this->getParam('title')
        )->setBody(
            $this->getParam('body')
        )->save();
        $this->dispatch($posts);
    }

    public function updatePostsAction($id)
    {
        $this->isAuthenticated;
        $posts = Post::findFirstById($id)->setImg(
            $this->getParam('img')
        )->setTitle(
            $this->getParam('title')
        )->setBody(
            $this->getParam('body')
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
        //$this->isAuthenticated;
        $posts = (new Package())->setType(
            $this->getParam('type')
        )->setName(
            $this->getParam('name')
        )->setSlug(
            $this->getParam('name')
        )->setDescription(
            $this->getParam('description', 'description')
        )->setLink(
            $this->getParam('link')
        );
        $this->save($posts);
    }

    public function updatePackageAction($id)
    {
       // $this->isAuthenticated;
        $posts = (new Package())->setType(
            $this->getParam('type')
        )->setName(
            $this->getParam('name')
        )->setSlug(
            $this->getParam('name')
        )->setDescription(
            $this->getParam('description', '')
        )->setLink(
            $this->getParam('link')
        );

        $this->save($posts);
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
    {   /// TODO: Authentication
        // $this->isAuthenticated;
        $posts = (new Project())->setImg(
            $this->getParam('img')
        )->setTitle(
            $this->getParam('title')
        )->setBody(
            $this->getParam('body')
        )->save();

        $this->dispatch($posts);
    }

    public function updateProjectAction($id)
    {
        $posts = Project::findFirstById($id)->setImg(
            $this->getParam('img')
        )->setTitle(
            $this->getParam('title')
        )->setBody(
            $this->getParam('body')
        )->save();
        $this->dispatch($posts);
    }


}