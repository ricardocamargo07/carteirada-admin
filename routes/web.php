<?php

Auth::routes();

Route::get('/', ['as' => 'home', 'uses' => 'Home@index']);

Route::get('/clipping', ['as' => 'clipping.index', 'uses' => 'Clipping@index']);

Route::get('/awards', ['as' => 'awards.index', 'uses' => 'Awards@index']);

Route::group(['prefix' => '/partials'], function () {
    Route::get('/lei', ['as' => 'partials.leis', 'uses' => 'Home@leis']);

    Route::get('/busca', ['as' => 'partials.busca', 'uses' => 'Home@busca']);
});

Route::group(['prefix' => '/auth'], function () {
    Route::get('/google/callback', 'Google@index')->name('google.callback');
});

Route::group(['prefix' => '/admin', 'middleware' => ['auth', 'admin']], function () {
    Route::get('/', 'Admin@laws')->name('admin.index');

    Route::get('/laws', 'Admin@laws')->name('admin.laws');
});

Route::group(['prefix' => '/docs'], function () {
    Route::get('/privacidade', 'Docs@privacy')->name('docs.privacy');
});
