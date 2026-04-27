<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminBrandController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminCouponController;
use App\Http\Controllers\Admin\AdminBannerController;
use App\Http\Controllers\Admin\SalesReportController;
use Illuminate\Support\Facades\Route;

// ── PUBLIC STOREFRONT ────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [HomeController::class, 'shop'])->name('shop');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::post('/search', [HomeController::class, 'search'])->name('search');

// Cart (Public)
Route::group(['prefix' => 'cart', 'as' => 'cart.'], function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/add', [CartController::class, 'add'])->name('add');
    Route::delete('/remove/{product}', [CartController::class, 'remove'])->name('remove');
    Route::post('/update-quantity/{operation}', [CartController::class, 'updateQuantity'])->name('update-quantity');
    Route::get('/checkout', [CartController::class, 'checkout'])->name('checkout');
});

// Wishlist (Public)
Route::group(['prefix' => 'wishlist', 'as' => 'wishlist.'], function () {
    Route::get('/', [WishlistController::class, 'index'])->name('index');
    Route::post('/add', [WishlistController::class, 'add'])->name('add');
    Route::delete('/remove/{product}', [WishlistController::class, 'remove'])->name('remove');
});

// ── AUTH (Universal Gateway) ────────────────────────────────────────────────
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

// ── CUSTOMER FEATURES (Login Required) ──────────────────────────────────────
Route::middleware(['auth'])->group(function () {
    // Orders
    Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
        Route::post('/place', [OrderController::class, 'place'])->name('place');
        Route::post('/place-online', [OrderController::class, 'placeOnline'])->name('place-online');
        Route::post('/place-wallet', [OrderController::class, 'placeWallet'])->name('place-wallet');
        Route::post('/verify-payment', [OrderController::class, 'verifyPayment'])->name('verify-payment');
        Route::get('/complete', [OrderController::class, 'complete'])->name('complete');
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::post('/cancel', [OrderController::class, 'cancel'])->name('cancel');
        Route::post('/return', [OrderController::class, 'return'])->name('return');
        Route::get('/invoice', [OrderController::class, 'invoice'])->name('invoice');
    });

    // Address
    Route::group(['prefix' => 'addresses', 'as' => 'addresses.'], function () {
        Route::get('/', [AddressController::class, 'index'])->name('index');
        Route::post('/', [AddressController::class, 'store'])->name('store');
        Route::get('/{address}/edit', [AddressController::class, 'edit'])->name('edit');
        Route::put('/{address}', [AddressController::class, 'update'])->name('update');
        Route::post('/set-default', [AddressController::class, 'setDefault'])->name('set-default');
    });

    // Profile & Wallet
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/wallet/history', [WalletController::class, 'history'])->name('wallet.history');
    Route::post('/wallet/add-money', [WalletController::class, 'addMoney'])->name('wallet.add-money');
    Route::post('/apply-coupon', [CouponController::class, 'apply'])->name('coupon.apply');
});

// ── MANAGEMENT PORTAL ────────────────────────────────────────────────────────
Route::group(['prefix' => 'portal', 'as' => 'admin.'], function () {
    // Admin Login (Universal View)
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
        
        Route::resource('users', AdminUserController::class)->only(['index']);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('brands', AdminBrandController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('orders', AdminOrderController::class);
        Route::resource('coupons', AdminCouponController::class);
        Route::resource('banners', AdminBannerController::class);
        Route::get('/sales-report', [SalesReportController::class, 'index'])->name('sales-report.index');
    });
});
