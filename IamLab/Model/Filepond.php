<?php
namespace IamLab\Model;
use IamLab\Core\API\Entity;

class Filepond extends Entity
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $filename;

    /**
     *
     * @var string
     */
    public $filepath;

    /**
     *
     * @var string
     */
    public $extension;

    /**
     *
     * @var string
     */
    public $mimetypes;

    /**
     *
     * @var string
     */
    public $expires_at;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("phalcons");
        $this->setSource("filepond");
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Filepond[]|Filepond|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null): \Phalcon\Mvc\Model\ResultsetInterface
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Filepond|\Phalcon\Mvc\Model\ResultInterface|\Phalcon\Mvc\ModelInterface|null
     */
    public static function findFirst($parameters = null): ?\Phalcon\Mvc\ModelInterface
    {
        return parent::findFirst($parameters);
    }

}
