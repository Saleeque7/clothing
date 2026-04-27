<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Coupon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminCouponController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => Coupon::latest()->paginate(10)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Coupons/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:coupons,code',
            'discount_amount' => 'required|numeric|min:0',
            'min_purchase_amount' => 'required|numeric|min:0',
            'expiry_date' => 'required|date|after:today',
        ]);

        Coupon::create($validated);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function destroy(Coupon $coupon): RedirectResponse
    {
        $coupon->delete();
        return back()->with('success', 'Coupon deleted successfully.');
    }
}
