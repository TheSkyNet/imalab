<?php

namespace IamLab\Model;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as Email;

class User extends Model
{

  /**
   * @var integer
   * @Primary
   * @Identity
   * @Column(type="integer", length=32, nullable=false)
   */
  protected $id;

  /**
   * @var string
   * @Column(type="string", length=50, nullable=false)
   */
  protected $name;

  /**
   * @var string
   * @Column(type="string", length=50, nullable=false)
   */
  protected $email;

  /**
   * @var string
   * @Column(type="string", length=255, nullable=false)
   */
  protected $password;

  /**
   * Method to set the value of field id
   *
   * @param integer $id
   *
   * @return $this
   */
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }

  /**
   * Method to set the value of field name
   *
   * @param string $name
   *
   * @return $this
   */
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
   * Method to set the value of field email
   *
   * @param string $email
   *
   * @return $this
   */
  public function setEmail($email)
  {
    $this->email = $email;

    return $this;
  }

  /**
   * Method to set the value of field password
   *
   * @param string $password
   *
   * @return $this
   */
  public function setPassword($password)
  {
    $this->password = $password;

    return $this;
  }

  /**
   * Returns the value of field id
   *
   * @return integer
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * Returns the value of field name
   *
   * @return string
   */
  public function getName()
  {
    return $this->name;
  }

  /**
   * Returns the value of field email
   *
   * @return string
   */
  public function getEmail()
  {
    return $this->email;
  }

  /**
   * Returns the value of field password
   *
   * @return string
   */
  public function getPassword()
  {
    return $this->password;
  }

  /**
   * Validations and business logic
   *
   * @return boolean
   */
  public function validation()
  {
      return true;
    $this->validate(
      new Email(
        [
          'field'    => 'email',
          'required' => true,
        ]
      )
    );

    if ($this->validationHasFailed() == true)
    {
      return false;
    }

    return true;
  }

  /**
   * Initialize method for model.
   */
  public function initialize()
  {

    $this->setSource('user');
  }

  /**
   * Returns table name mapped in the model.
   *
   * @return string
   */
  public function getSource()
  {
    return 'user';
  }

  /**
   * Allows to query a set of records that match the specified conditions
   *
   * @param mixed $parameters
   *
   * @return User[]|Model\ResultsetInterface
   */
  public static function find($parameters = null)
  {
    return parent::find($parameters);
  }

  /**
   * Allows to query the first record that match the specified conditions
   *
   * @param mixed $parameters
   *
   * @return User|Model
   */
  public static function findFirst($parameters = null)
  {
    return parent::findFirst($parameters);
  }

}
