<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'laws', 'middleware' => 'auth:api'], function () {
    Route::get('/', 'Api\Laws@all');

    Route::post('/', 'Api\Laws@create');

    Route::post('/{law_id}', 'Api\Laws@post');
});
