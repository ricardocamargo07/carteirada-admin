<?php

namespace App\Http\Controllers;

use App\Services\Google\Spreadsheet;

class Laws extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $spreadsheet = app(Spreadsheet::class);

        return view('laws.index');
    }
}
