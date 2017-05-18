<?php

namespace App\Data\Repositories;

use App\Data\Models\User as Model;

class Users extends Repository
{
    private function findByEmail($email)
    {
        return Model::where('email', $email)->first();
    }

    public function makeAdmin($email)
    {
        $user = $this->findByEmail($email);

        $user->is_admin = true;

        $user->save();
g
        return $user;
    }
}
