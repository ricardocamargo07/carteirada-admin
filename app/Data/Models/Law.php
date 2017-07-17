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
        'paragrafo',
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
        'apito',
    ];

    protected $appends = ['image_name', 'image_path'];

    private function getImageName()
    {
        return
            'lei-'. $this->identificadorLei .'.png'
        ;
    }

    public function getIdentificadorLeiAttribute()
    {
        return
            trim($this->numero) . '-' .
            trim($this->ano) . (! is_null($this->paragrafo) ? '-' : '') .
            $this->normalizeParagraphNumber($this->paragrafo)
        ;
    }

    public function getIdentificadorLei($addParagraph = true)
    {
        $id = trim($this->numero) . '-' . trim($this->ano);

        if ($addParagraph) {
            $id .=
                (! is_null($this->paragrafo) ? '-' : '') .
                $this->normalizeParagraphNumber($this->paragrafo)
            ;
        }

        return $id;
    }

    public function getImageNameAttribute()
    {
        return $this->getImageName();
    }

    public function getImagePathAttribute()
    {
        return
            'http://carteiradadobem.antoniocarlosribeiro.com/assets/images/leis/'.$this->getImageName()
        ;
    }

    private function normalizeParagraphNumber($paragrafo)
    {
        return
            trim(str_replace('.', '-', str_replace('_', '-', str_replace(' ', '', $paragrafo))))
        ;
    }
}
