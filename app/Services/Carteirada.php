<?php

namespace App\Services;

use App\Data\Models\Law;
use League\HTMLToMarkdown\HtmlConverter;

class Carteirada
{
    private function convertHtml2Markdown($string)
    {
        $converter = new HtmlConverter();

        $string = $converter->convert($string);

        $string = str_replace('<div class="separator"></div>',"\n\r*****\n\r", $string);

        return $string;
    }

    private function convertLawHtmlToMarkdown($model)
    {

        $model->html = $this->convertHtml2Markdown($model->html);
        $model->descricao = $this->convertHtml2Markdown($model->descricao);
        $model->multa_texto = $this->convertHtml2Markdown($model->multa_texto);
        $model->punicao = $this->convertHtml2Markdown($model->punicao);
    }

    private function extractTabbedColumns($line)
    {
        $line = str_replace("\r\n", '', $line);

        $columns = explode("\t", $line);

        foreach ($columns as $key => $column) {
            $columns[$key] = trim($column);
        }

        return $columns;
    }

    private function getCsvFilename()
    {
        return base_path() . '/leis-carteirada-todas.tsv';
    }

    public function getJsPath()
    {
        return app_path() . '/../../mobile/www/assets/js';
    }

    /**
     * @return string
     */
    private function getAppJsonFileName()
    {
        return $this->getJsPath().'/leis.js';
    }

    public function getJson()
    {
        $file = file_get_contents($this->getAppJsonFileName());

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

    public function importCsv($command = null)
    {
        $lines = file($this->getCsvFilename());

        $columns = $this->extractTabbedColumns($lines[0]);

        unset($lines[0]);
        unset($lines[1]);

        Law::truncate();

        foreach ($lines as $row => $line) {
            $data = $this->extractTabbedColumns($line);

            $model = new Law();

            foreach ($data as $key => $info) {
                $model->{$columns[$key]} = $data[$key];
            }

            $this->convertLawHtmlToMarkdown($model);

            $this->info($command, "{$row} - {$model->numero}/{$model->ano} - {$model->nome_lei}");

            $model->save();
        }
    }

    private function info($command, $string)
    {
        if (! is_null($command)) {
            $command->info($string);
        }
    }
}
