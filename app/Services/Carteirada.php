<?php

namespace App\Services;

class Carteirada
{
    public function getJsPath()
    {
        return app_path() . '/../../mobile/www/assets/js';
    }

    /**
     * @return string
     */
    private function getFileName()
    {
        return $this->getJsPath().'/leis.js';
    }

    public function getJson()
    {
        $file = file_get_contents($this->getFileName());

        $file = str_replace("\n", " ", $file);
        $file = str_replace("\r", " ", $file);
        $file = str_replace("\t", " ", $file);

        while(strpos($file, '  ')) {
            $file = str_replace("  ", " ", $file);
        }

        $string = 'var json = {';
        $file = substr($file, strpos($file, $string) + strlen($string)-1);

        $file = str_replace('} ] } };', '} ] } }', $file);

        $array = json_decode($file, true);

        file_put_contents($this->getJsPath().'/leis.json', $file);

        $separator = "|";

        $lines = '';

        foreach (array_keys($array['cartao']['lei'][0]) as $key) {
            $lines .= $key . $separator;
        }

        $lines .= "\n";

        foreach ($array['cartao']['lei'] as $data) {
            $lines .=
                $data['id'] . $separator .
                $data['imagem'] . $separator .
                $data['numero'] . $separator .
                $data['colorheader'] . $separator .
                $data['categoria'] . $separator .
                $data['categoriaslug'] . $separator .
                $data['subcategoria'] . $separator .
                $data['nomelei'] . $separator .
                $data['nome'] . $separator .
                $data['dataLei'] . $separator .
                $data['descr1'] . $separator .
                $data['html'] . $separator .
                $data['punicao'] . $separator .
                $data['multatexto'] .
                "\n"
            ;
        }

        file_put_contents($this->getJsPath().'/leis.csv', $lines);
    }
}
