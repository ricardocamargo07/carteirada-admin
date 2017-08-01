<?php

namespace App\Data\Repositories;

use App\Data\Models\Clipping as ClippingModel;
use Carbon\Carbon;

class Clipping extends Repository
{
    public function getModel()
    {
        return ClippingModel::class;
    }

    public function add($data)
    {
        $data['date'] = $this->toDatabaseDate($data['date']);

        return ClippingModel::create($data);
    }

    private function toDatabaseDate($date)
    {
        $date = Carbon::parse($date);

        return $date->format('Y-m-d');
    }

    public function all()
    {
        return ClippingModel::orderBy('date', 'desc')->get();
    }
}
