<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_orders' => Order::count(),
            'revenue' => Order::where('status', 'Delivered')->sum('total_amount'),
            'users' => User::where('role_id', \App\Models\Role::CUSTOMER)->count(),
            'products' => Product::count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'salesData' => [] // can be populated later
        ]);
    }
}
