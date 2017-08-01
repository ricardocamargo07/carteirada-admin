<?php

namespace App\Data\Models;

use App\Events\ModelChanged;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Model extends Eloquent
{
    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $events = [
        'created' => ModelChanged::class,
        'saved' => ModelChanged::class,
        'deleted' => ModelChanged::class,
    ];
}
