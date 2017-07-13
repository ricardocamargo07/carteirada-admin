<?php

namespace App\Http\Middleware;

class MustBeSuperAdmin
{
    public function handle($request, $next)
    {
        if (is_super_admin()) {
            return abort(403); // unauthorized
        }

        return $next($request);
    }
}
