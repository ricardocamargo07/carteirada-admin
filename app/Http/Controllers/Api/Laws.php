<?php

namespace App\Http\Controllers\Api;

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
        return $this->lawsRepository->all()->map(function($law) {
            $law['html'] = $this->markdown->toMarkdown($law['html']);

            $law['descricao'] = $this->markdown->toMarkdown($law['descricao']);

            $law['multa_texto'] = $this->markdown->toMarkdown($law['multa_texto']);

            $law['punicao'] = $this->markdown->toMarkdown($law['punicao']);

            return $law;
        });
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
}
