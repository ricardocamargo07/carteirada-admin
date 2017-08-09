<?php

namespace App\Data\Repositories;

use App\Data\Models\Law;
use Carbon\Carbon;

class Laws extends Repository
{
    public function published()
    {
        return $this->all()->reject(function($law) {
            return ! $law->is_published;
        });
    }

    public function getModel()
    {
        return Law::class;
    }

    public function publish($id, $is_published)
    {
        $law = $this->findById($id);

        if ($law->is_published = ! $is_published) {
            $law->published_at = Carbon::now();
        }

        $law->save();

        return $law;
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
        return Law::create(
            collect($input)->filter()->toArray()
        );
    }

    public function all()
    {
        $model = $this->getModel();

        return $model::orderBy('ano', 'desc')
                ->orderBy('numero', 'desc')
                ->get();
    }
}
