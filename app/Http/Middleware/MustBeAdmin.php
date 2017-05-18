<?php

namespace App\Http\Middleware;

use Auth;

class MustBeAdmin
{
    public function handle($request, $next)
    {
        if (! Auth::user()->is_admin) {
            return abort(403); // unauthorized
        }

        return $next($request);
    }
}
