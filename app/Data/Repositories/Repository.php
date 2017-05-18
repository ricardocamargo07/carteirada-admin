<?php

namespace App\Data\Repositories;

abstract class Repository
{
    public function all()
    {
        $model = $this->getModel();

        return $model::all();
    }
}
