<?php

namespace App\Data\Models;

class Award extends Model
{
    protected $table = 'awards';

    protected $fillable = [
        'date',
        'type',
        'title',
        'image',
        'url'
    ];
}
