<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminOrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('user')->latest()->paginate(10)
        ]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->load(['user', 'items.product', 'address'])
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Processing,Shipped,Delivered,Cancelled,Returned',
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated successfully.');
    }
}
