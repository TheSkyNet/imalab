<?php

namespace App\Core\Helpers;


use IamLab\Core\Collection\Collection;

function cast($value, $cast)
{
    // cast a value in to a type
    return match ($cast) {
        'int' => intval($value),
        'float' => floatval($value),
        'bool' => boolval($value),
        'string' => strval($value),
        default => $value,
    };

}

function merge_objects(...$objects)
{

    if (count($objects) < 1) {
        return;
    }
    if ($objects[0] instanceof \stdClass) {
        $new_object = new \stdClass();
    } else {
        $new_object = new \get_class($objects[0]);
    }

    foreach ($objects as $object) {
        foreach ($object as $property => $value) {
            $new_object->$property = $value;
        }

    }
    return $new_object;
}

function splat(...$args)
{
    return $args;
}


function concatenate($transform, ...$strings) {
    $string = implode('', $strings);
    return($transform($string));
}


function collect($collection): Collection
{
    return new Collection($collection);
}