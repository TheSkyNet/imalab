<?php

namespace IamLab\Service;

use IamLab\Core\API\aAPI;
use IamLab\Model\Code;
use IamLab\Model\Filepond;
use IamLab\Model\Package;
use IamLab\Model\Post;
use IamLab\Model\Project;
use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemException;
use function App\Core\Helpers\dd;
use function App\Core\Helpers\decrypt;
use function App\Core\Helpers\moveTo;

/**
 * @property void isAuthenticated
 * @property Filesystem $file
 * @property Filesystem $fs
 */
class API extends aAPI
{
    public function getAllAction()
    {
        $posts = Post::find();
        $packages = Package::find();
        $project = Project::find();
        $code = Code::find();

        $this->dispatch([$posts, $packages, $project, $code]);
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


    public function getCodeAction()
    {
        $posts = Code::find();
        $this->dispatch($posts);
    }


    public function getCodeByIdAction(int $id)
    {
        $posts = Code::findFirstById($id);
        $this->dispatch($posts);
    }
    public function getCodeByIdHtmlAction(int $id)
    {
        /** @var Code $code */
        $code = Code::findFirstById($id);
        $this->response->setContentType('text/html', 'UTF-8');

        $this->response->setContent($code->getBody());
        $this->response->send();
    }

    public function deleteCodeAction(int $id)
    {
        $project = Code::findFirstById($id);

        $this->delete($project);
    }
    public function newCodeAction()
    {
//       / $this->isAuthenticated;
        dd($_POST,   $this->getParam('body'));
        $posts = (new Code())->setImg(
            $this->getParam('img')
        )->setTitle(
            $this->getParam('title')
        )->setBody(
            $this->getParam('body')
        )->save();
        $this->dispatch($posts);
    }

    public function getFilesAction()
    {
        $fp =  FILE_PATH;
        $project = Filepond::find("filepath = '$fp'");


        $this->dispatch($project);
    }

    /**
     * @throws FilesystemException
     * @throws \SodiumException
     */
    public function saveFilesAction()
    {
        $project = $this->file->listContents('',  true);

        $id = json_decode(decrypt($this->getParam('file')));

        $faile = Filepond::findFirst($id->id);

        moveTo('fs',$faile->filepath.'/'.$faile->filename ,  FILE_PATH .'/'.$faile->filename );

        $faile->filepath = FILE_PATH;

        $faile->save();

        $this->dispatch($project);
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
    //    $this->isAuthenticated;
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