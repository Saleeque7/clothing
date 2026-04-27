<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::where('role_id', \App\Models\Role::CUSTOMER)
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function block(User $user)
    {
        $user->update(['is_blocked' => true]);
        return back()->with('success', 'User has been blocked.');
    }

    public function unblock(User $user)
    {
        $user->update(['is_blocked' => false]);
        return back()->with('success', 'User has been unblocked.');
    }
}
