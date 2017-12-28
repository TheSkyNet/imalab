<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

/**
 * Class PackageMigration_100
 */
class PackageMigration_100 extends Migration
{
    /**
     * Define the table structure
     *
     * @return void
     */
    public function morph()
    {
        $this->morphTable('package', [
                'columns' => [
                    new Column(
                        'id',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'notNull' => true,
                            'autoIncrement' => true,
                            'first' => true
                        ]
                    ),
                    new Column(
                        'name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 1000,
                            'after' => 'id'
                        ]
                    ),
                  new Column(
                    'description',
                    [
                      'type' => Column::TYPE_VARCHAR,
                      'notNull' => true,
                      'size' => 1000,
                      'after' => 'name'
                    ]
                  ),
                    new Column(
                        'lang',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 500,
                            'after' => 'name'
                        ]
                    ),
                    new Column(
                        'link',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 50,
                            'after' => 'lang'
                        ]
                    ),
                    new Column(
                        'slug',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 100,
                            'after' => 'link'
                        ]
                    ),
                    new Column(
                        'type',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => false,
                            'size' => 15,
                            'after' => 'slug',
                            'default' => 'package'
                        ]
                    )
                ],
                'indexes' => [
                    new Index('package_id_uindex', ['id'], null),
                    new Index('package_pkey', ['id'], null)
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
