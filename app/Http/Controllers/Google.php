<?php

namespace App\Http\Controllers;

use App\Services\Google\Spreadsheet;

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
