<?php

namespace App\Http\Controllers;

use App\Data\Repositories\Awards as AwardsRepository;

class Awards extends Controller
{
    /**
     * @var AwardsRepository
     */
    private $repository;

    /**
     * Awards constructor.
     *
     * @param AwardsRepository $repository
     */
    public function __construct(AwardsRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Main page.
     *
     * @return $this
     */
    public function index()
    {
        return view('awards.index');
    }
}

