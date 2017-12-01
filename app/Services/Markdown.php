<?php

namespace App\Services;

use Parsedown;
use League\HTMLToMarkdown\HtmlConverter;
use League\CommonMark\CommonMarkConverter;

class Markdown
{
    public function toMarkdown($string)
    {
        $converter = new HtmlConverter();

        $string = $converter->convert($string);

        $string = str_replace('<div class="separator"></div>',"\n\r*****\n\r", $string);

        return $string;
    }

    public function commonMarkToHtml($string)
    {
        return (new CommonMarkConverter())->convertToHtml($string);
    }

    public function githubToHtml($string)
    {
        return (new Parsedown())->text($string);
    }
}
