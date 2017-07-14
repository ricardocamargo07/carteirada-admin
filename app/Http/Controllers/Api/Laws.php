<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use App\Services\Markdown;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Data\Repositories\Laws as LawsRepository;

class Laws extends Controller
{
    /**
     * @var Request
     */
    private $request;

    /**
     * @var LawsRepository
     */
    private $lawsRepository;

    /**
     * @var Markdown
     */
    private $markdown;

    public function __construct(Request $request, LawsRepository $lawsRepository, Markdown $markdown)
    {
        $this->request = $request;

        $this->lawsRepository = $lawsRepository;

        $this->markdown = $markdown;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        return $this->lawsRepository->all()->toArray();
    }

    private function getFormattedLaws()
    {
        $data = $this->lawsRepository->all()->map(function($law) {
            $law['html'] = $this->markdown->toHtml($law['html']);

            $law['descricao'] = $this->markdown->toHtml($law['descricao']);

            $law['multa_texto'] = $this->markdown->toHtml($law['multa_texto']);

            $law['punicao'] = $this->markdown->toHtml($law['punicao']);

            $law['nomelei'] = $law['nome_lei'];

            $law['dataLei'] = $this->toDateName($law['data_lei']);

            $law['multatexto'] = $law['multa_texto'];

            $law['imagem'] = $law['identificadorLei'];

            $law['image_file'] = 'assets/images/'.$law['image_name'];

            $law['colorheader'] = 'white';

            $law['descr1'] = $law['descricao'];

            $law['numero'] = $law->getIdentificadorLei(false);

            return $law;
        });

        $result = [];

        foreach ($data as $key => $row) {
            foreach (explode('/', $row['categoria']) as $category) {
                $category = trim(mb_strtolower($category));

                $row['categoria'] = Str::title($category);

                $row['categoriaslug'] = str_slug($row['categoria']);

                $result[] = $row->toArray();
            }
        }

        return $result;
    }

    public function post($law_id)
    {
        $this->lawsRepository->update($law_id, $this->request->all());
    }

    public function create()
    {
        $this->lawsRepository->create($this->request->all());
    }

    public function downloadCode()
    {
        $result = [
            'cartao' => [
                'lei' => $this->getFormattedLaws()
            ],
        ];

        return 'var json = ' . json_encode($result) . ';';
    }

    private function toDateName($data_lei)
    {
        setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');

        date_default_timezone_set('America/Sao_Paulo');

        return Str::lower(strftime('%d de %B de %Y', strtotime($data_lei)));
    }
}
