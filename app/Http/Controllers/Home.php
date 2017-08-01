<?php

namespace App\Http\Controllers;

use App\Services\ShareCount\Service as ShareCountService;

class Home extends Controller
{
    private function getShareCount()
    {
        return new ShareCountService('http://carteiradadobem.com.br');
    }

    public function index()
    {
        return
            view('home.index')
            ->with('shareCount', $this->getShareCount())
        ;
    }

    public function home()
    {
        return view('home.home');
    }

    public function leis()
    {
        return view('home.lei');
    }

    public function busca()
    {
        return view('home.busca');
    }
}
