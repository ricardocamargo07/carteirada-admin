<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Data\Repositories\Laws as LawsRepository;

class Laws extends Controller
{
    /**
     * @var Request
     */
    private $request;
    /**
     * @var LawsRepository
     */
    private $lawsRepository;

    public function __construct(Request $request, LawsRepository $lawsRepository)
    {
        $this->request = $request;

        $this->lawsRepository = $lawsRepository;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        return $this->lawsRepository->all();
    }

    public function post($law_id)
    {
        $this->lawsRepository->update($law_id, $this->request->all());
    }
}
