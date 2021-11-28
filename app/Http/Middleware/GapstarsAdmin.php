<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Request;
use App;

class GapstarsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if (!$user->isAdmin() ) {
           return  response()->json(['error' => 'Unauthorized Access'],401);
        }
        return $next($request);
    }
}
