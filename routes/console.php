<?php

use App\Data\Repositories\Users;
use App\Services\Carteirada;

Artisan::command('carteirada:getjson', function () {
    app(Carteirada::class)->getJson();
})->describe('Extract info from App JSON');

Artisan::command('carteirada:importcsv', function () {
    app(Carteirada::class)->importCsv($this);
})->describe('Import CSV file from Google Docs');

Artisan::command('carteirada:admin {email}', function ($email) {
    if($user = app(Users::class)->makeAdmin($email)){
        $this->info($user->name.' is now an administrator');
    }else{
        $this->info('Email '.$email.' could not be found');
    }

})->describe('Make a user an administrator');

Artisan::command('carteirada:clipping {date} {type} {title} {url}', function ($date, $type, $title, $url) {
    app(\App\Data\Repositories\Clipping::class)->add([
        'date' => $date,
        'type' => $type,
        'title' => $title,
        'url' => $url,
    ]);

    $this->info("'$title' was added");
})->describe('Make a user an administrator');
