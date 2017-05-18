<?php

namespace App\Data\Repositories;

use App\Data\Models\Law;

class Laws extends Repository
{
    public function getModel()
    {
        return Law::class;
    }

    public function update($law_id, $input)
    {
        $law = Law::findOrFail($law_id);

        $law->fill($input);

        $law->save();

        return $law;
    }

    public function create($input)
    {
        return Law::create($input);
    }

    public function all()
    {
        $model = $this->getModel();

        return $model::orderBy('ano', 'desc')
                ->orderBy('numero', 'desc')
                ->get();
    }
}
