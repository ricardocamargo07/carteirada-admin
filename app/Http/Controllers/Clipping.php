<?php

namespace App\Http\Controllers;

use App\Data\Repositories\Clipping as ClippingRepository;

class Clipping extends Controller
{
    /**
     * @var ClippingRepository
     */
    private $repository;

    public function __construct(ClippingRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return
            view('clipping.index')
                ->with('clipping', $this->repository->all())
            ;
    }
}
