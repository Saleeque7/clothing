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
        $request->authenticate();

        if (!Auth::guard('admin')->user()->is_admin) {
            Auth::guard('admin')->logout();
            return back()->withErrors(['email' => 'Access denied. You do not have administrator privileges.']);
        }

        $request->session()->regenerate();

        return redirect()->route('admin.dashboard');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
}
