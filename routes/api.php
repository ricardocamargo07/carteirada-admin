<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'laws'], function () {
    Route::get('/json', 'Api\Laws@json');
});

Route::group(['prefix' => 'laws', 'middleware' => 'auth:api'], function () {
    Route::get('/', 'Api\Laws@all');

    Route::post('/', 'Api\Laws@create');

    Route::get('/download/code', 'Api\Laws@downloadCode');

    Route::post('/publish', 'Api\Laws@publish');

    Route::post('/{law_id}', 'Api\Laws@post');
});
