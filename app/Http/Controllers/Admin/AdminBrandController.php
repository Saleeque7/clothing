<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminBrandController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Brands/Index', [
            'brands' => Brand::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:brands,name']);
        
        $brand = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('brands', 'public');
            $brand->update(['image' => $path]);
        }

        return back()->with('success', 'Brand added successfully.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return back()->with('success', 'Brand removed.');
    }
}
