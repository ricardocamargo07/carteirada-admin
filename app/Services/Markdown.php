<?php

namespace App\Services;

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

    public function toHtml($string)
    {
        return (new CommonMarkConverter())->convertToHtml($string);
    }
}
