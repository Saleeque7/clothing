<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $banners = Banner::where('is_active', true)->latest()->get();
        $featuredProducts = Product::with('primaryImage', 'images')
            ->where('is_listed', true)
            ->where('is_deleted', false)
            ->latest()
            ->take(8)
            ->get();
        
        $categories = Category::where('is_listed', true)
            ->where('is_deleted', false)
            ->get();
            
        $brands = Brand::where('is_listed', true)
            ->where('is_deleted', false)
            ->get();

        return Inertia::render('User/Home', [
            'banners' => $banners,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function shop(Request $request): Response
    {
        $query = Product::with('primaryImage', 'images')
            ->where('is_listed', true)
            ->where('is_deleted', false);

        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('brand')) {
            $query->whereHas('brand', function($q) use ($request) {
                $q->where('slug', $request->brand);
            });
        }

        if ($request->has('search')) {
            $query->where('product_name', 'like', "%{$request->search}%");
        }

        $products = $query->latest()->paginate(12)->withQueryString();
        
        $categories = Category::where('is_listed', true)->get();
        $brands = Brand::where('is_listed', true)->get();

        return Inertia::render('User/Shop', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['search', 'category', 'brand']),
        ]);
    }

    public function search(Request $request)
    {
        return redirect()->route('watches', ['search' => $request->search]);
    }
}
