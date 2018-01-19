<?php

namespace App\Http\Controllers;

class Google extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function callback()
    {
        return view('laws.index');
    }
}
