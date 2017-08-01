<?php

namespace App\Http\Controllers;

class Admin extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function laws()
    {
        return view('admin.laws');
    }
}
