<?php

namespace App\Data\Repositories;

abstract class Repository
{
    public function all()
    {
        $model = $this->getModel();

        return $model::all();
    }

    public function findById($id)
    {
        return call_user_func([$this->getModel(), 'find'], $id);
    }
}
