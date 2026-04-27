<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AdminLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login', [
            'isAdminPortal' => true
        ]);
    }

    public function login(AdminLoginRequest $request): RedirectResponse
    {
        // Regenerate session first for a stable state
        $request->session()->regenerate();

        $request->authenticate(); // This now needs to use web guard in request

        if (!Auth::user()->is_admin) {
            Auth::logout();
            return back()->withErrors(['email' => 'Access denied. You do not have administrator privileges.']);
        }

        return redirect()->intended(route('admin.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}
