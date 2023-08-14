<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleKelurahanMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = JWTAuth::parseToken();
        $role = Role::where('role', 'kelurahan')->firstOrFail();

        if(!$user || $user->role->role !== $role->role) {
            return response()->json([
                'success' => false,
                'message' => 'User bukan admin kelurahan'
            ], 401);
        }
        return $next($request);
    }
}
