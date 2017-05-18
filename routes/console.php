<?php

use App\Services\Carteirada;

Artisan::command('carteirada:getjson', function () {
    app(Carteirada::class)->getJson();
})->describe('Extract info from App JSON');

Artisan::command('carteirada:importcsv', function () {
    app(Carteirada::class)->importCsv($this);
})->describe('Import CSV file from Google Docs');
