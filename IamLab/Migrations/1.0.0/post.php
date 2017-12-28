<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

/**
 * Class PostMigration_100
 */
class PostMigration_100 extends Migration
{
    /**
     * Define the table structure
     *
     * @return void
     */
    public function morph()
    {
        $this->morphTable('post', [
                'columns' => [

                    new Column(
                        'id',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'notNull' => true,
                            'autoIncrement' => true,
                            'first' => true,
                        ]
                    ),
                    new Column(
                        'title',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 1000,
                            'after' => 'id'
                        ]
                    ),
                    new Column(
                        'img',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 1000,
                            'after' => 'title'
                        ]
                    ),
                    new Column(
                        'body',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 1000,
                            'after' => 'img'
                        ]
                    ),
                  new Column(
                    'type',
                    [
                      'type' => Column::TYPE_VARCHAR,
                      'notNull' => false,
                      'size' => 15,
                      'after' => 'slug',
                      'default' => 'post'
                    ]
                  )
                ],
                'indexes' => [
                    new Index('post_id_uindex', ['id'], null),
                    new Index('post_pkey', ['id'], null)
                ],
            ]
        );
    }

    /**
     * Run the migrations
     *
     * @return void
     */
    public function up()
    {

    }

    /**
     * Reverse the migrations
     *
     * @return void
     */
    public function down()
    {

    }

}
