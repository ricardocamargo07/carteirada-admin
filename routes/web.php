<?php

Route::group(['prefix' => '/'], function () {
    Route::get('/', function () {
        return view('welcome');
    });
});

Auth::routes();

Route::group(['prefix' => '/auth'], function () {
    Route::get('/google/callback', 'Google@index')->name('google.callback');
});

Route::group(['prefix' => '/home', 'middleware' => 'auth'], function () {
    Route::get('/', 'HomeController@index')->name('home');
});

Route::group(['prefix' => '/laws', 'middleware' => ['auth','admin']], function () {
    Route::get('/', 'Laws@index')->name('laws.index');
});
