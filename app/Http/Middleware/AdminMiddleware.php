<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated via the standard web guard
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Check if the user has the "admin" (2) or "developer" (3) role
        $allowedRoles = [2, 3]; // Admin=2, Developer=3
        if (!in_array(Auth::user()->role_id, $allowedRoles)) {
            return redirect()->route('home'); // Redirect to home if unauthorized
        }

        return $next($request);
    }
}
