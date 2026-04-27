<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class SalesReportController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Order::where('status', 'Delivered');

        // Optional date filtering
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $reports = $query->with('user')->latest()->paginate(15);
        
        $stats = [
            'total_revenue' => $query->sum('total_amount'),
            'total_orders' => $query->count(),
            'avg_order_value' => $query->count() > 0 ? $query->avg('total_amount') : 0,
        ];

        return Inertia::render('Admin/SalesReport/Index', [
            'reports' => $reports,
            'stats' => $stats,
            'filters' => $request->only(['start_date', 'end_date'])
        ]);
    }
}
