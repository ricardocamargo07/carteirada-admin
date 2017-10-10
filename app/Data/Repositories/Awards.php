<?php

namespace App\Data\Repositories;

use Carbon\Carbon;
use App\Data\Models\Award as AwardModel;

class Awards extends Repository
{
    public function getModel()
    {
        return AwardModel::class;
    }

    public function add($data)
    {
        $data['date'] = $this->toDatabaseDate($data['date']);

        return AwardModel::create($data);
    }

    private function toDatabaseDate($date)
    {
        $date = Carbon::parse($date);

        return $date->format('Y-m-d');
    }

    public function all()
    {
        return AwardModel::orderBy('date', 'desc')->get();
    }
}

