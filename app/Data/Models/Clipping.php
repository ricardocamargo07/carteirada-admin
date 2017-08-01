<?php

namespace App\Data\Models;

class Clipping extends Model
{
    protected $table = 'clipping';

    protected $fillable = [
        'date',
        'type',
        'title',
        'url'
    ];
}
