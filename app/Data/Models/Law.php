<?php

namespace App\Data\Models;

class Law extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status',
        'link',
        'categoria',
        'numero',
        'ano',
        'nome_lei',
        'nome',
        'data_lei',
        'descricao',
        'subcategoria',
        'punicao',
        'multa_texto',
        'html',
        'imagem_1',
        'imagem_2',
        'obs',
    ];
}
