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
    $user = app(Users::class)->makeAdmin($email);

    $this->info($user->name.' is now an administrator');
})->describe('Make a user an administrator');
