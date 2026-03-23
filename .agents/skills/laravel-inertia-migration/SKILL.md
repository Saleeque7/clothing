---
name: Laravel 12 + Inertia.js + React Migration (Atomic Design)
description: >
  Migrate a Node.js (Express) + MongoDB + EJS e-commerce application into a
  production-ready Laravel 12 + Inertia.js + React stack. Preserves all
  business logic (auth, products, cart, orders, payments, wallet, coupons,
  banners, wishlists, sales reports). Converts MongoDB schemas to Eloquent
  models/migrations, replaces EJS views with Inertia React pages organised
  under the Atomic Design hierarchy, and follows a clean Laravel monolith
  architecture without a separate API layer.
  Package managers: **yarn** (JS) and **composer** (PHP).
---

# Migration Skill – Node.js E-Commerce → Laravel 12 + Inertia + React

## Overview

This skill guides the complete, step-by-step migration of the **tiktiknew**
e-commerce application from its current Node.js / Express / MongoDB / EJS
stack to a **Laravel 12 monolith** powered by **Inertia.js** and **React**,
using **Atomic Design** for all frontend components.

---

## Tech Stack Decisions

| Layer | Original | Target |
|---|---|---|
| Language | Node.js (JS) | PHP 8.2+ |
| Framework | Express 4 | Laravel 12 |
| ORM / DB Layer | Mongoose / MongoDB | Eloquent ORM / MySQL |
| View Layer | EJS templates | Inertia.js + React 18 |
| Auth | express-session + bcrypt | Laravel Breeze (Inertia/React preset) |
| File Uploads | Multer | Laravel Storage + `spatie/laravel-medialibrary` |
| Payments | Razorpay JS SDK | `razorpay/razorpay-php` + Inertia form |
| PDF Invoices | Puppeteer / easyinvoice | `barryvdh/laravel-dompdf` |
| Excel Reports | exceljs / excel4node | `maatwebsite/excel` |
| Email / OTP | nodemailer | Laravel Mail + `laravel/notifications` |
| JS Package Manager | npm | **yarn** |
| PHP Package Manager | — | **composer** |
| Component Design | EJS partials | **Atomic Design** (atoms → molecules → organisms → templates → pages) |

---

## Atomic Design Structure

All React components live under `resources/js/` and follow Atomic Design strictly:

```
resources/js/
├── Components/
│   ├── atoms/          # Smallest indivisible UI units
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Badge.jsx
│   │   ├── Avatar.jsx
│   │   ├── Spinner.jsx
│   │   ├── Label.jsx
│   │   ├── Price.jsx
│   │   ├── Rating.jsx
│   │   └── Alert.jsx
│   ├── molecules/      # Groups of atoms forming simple UI blocks
│   │   ├── FormField.jsx        # Label + Input + error
│   │   ├── ProductCard.jsx      # Image + title + price + badge
│   │   ├── CartItem.jsx         # Thumb + name + qty stepper + remove
│   │   ├── OrderRow.jsx         # Order summary row
│   │   ├── AddressCard.jsx      # Address block + default badge
│   │   ├── CouponBadge.jsx      # Coupon code chip
│   │   ├── WalletBar.jsx        # Balance display
│   │   ├── SearchBar.jsx        # Input + icon
│   │   ├── ImageUploader.jsx    # Drag-drop / preview box
│   │   └── Pagination.jsx       # Prev / next + page numbers
│   ├── organisms/      # Complex, self-contained sections
│   │   ├── Navbar.jsx           # Top nav with cart count, avatar
│   │   ├── Sidebar.jsx          # Admin sidebar with links
│   │   ├── ProductGrid.jsx      # Responsive grid of ProductCards
│   │   ├── CartSummary.jsx      # Cart items list + subtotal
│   │   ├── CheckoutForm.jsx     # Address selection + payment choice
│   │   ├── OrderList.jsx        # Paginated order table (admin / user)
│   │   ├── CouponManager.jsx    # Coupon CRUD table (admin)
│   │   ├── BannerSlider.jsx     # Homepage banner carousel
│   │   ├── SalesChart.jsx       # Chart.js sales report
│   │   └── DataTable.jsx        # Generic admin data table
│   └── templates/      # Page-level layout skeletons
│       ├── UserLayout.jsx       # Navbar + main + footer
│       └── AdminLayout.jsx      # Sidebar + main content area
├── Pages/              # Inertia page components (one per route)
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Otp.jsx
│   │   ├── ForgetPassword.jsx
│   │   ├── ForgetOtp.jsx
│   │   └── ResetPassword.jsx
│   ├── User/
│   │   ├── Home.jsx
│   │   ├── Watches.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderComplete.jsx
│   │   ├── OrderList.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Address.jsx
│   │   ├── AddressList.jsx
│   │   └── WalletHistory.jsx
│   └── Admin/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── Users.jsx
│       ├── Products.jsx
│       ├── AddProduct.jsx
│       ├── EditProduct.jsx
│       ├── Categories.jsx
│       ├── Brands.jsx
│       ├── Orders.jsx
│       ├── OrderDetail.jsx
│       ├── Coupons.jsx
│       ├── AddCoupon.jsx
│       ├── EditCoupon.jsx
│       ├── Banners.jsx
│       ├── AddBanner.jsx
│       └── SalesReport.jsx
├── hooks/
│   ├── useCart.js
│   ├── useWishlist.js
│   └── useFlash.js
└── app.jsx             # Inertia bootstrap
```

---

## Phase 1 – Laravel Project Scaffold

### 1.1 Create fresh Laravel 12 project

```bash
composer create-project laravel/laravel tiktiknew-laravel
cd tiktiknew-laravel
```

### 1.2 Install Laravel Breeze with Inertia + React preset

```bash
composer require laravel/breeze --dev
php artisan breeze:install react --typescript=no
```

> Breeze scaffolds: `resources/js/Pages/Auth/`, `app.jsx`, `HandleInertiaRequests` middleware,
> `vite.config.js`, and `package.json` with Inertia, React, @vitejs/plugin-react.

### 1.3 Install JS dependencies with **yarn**

```bash
yarn install
```

### 1.4 Install additional Composer packages

```bash
composer require \
  inertiajs/inertia-laravel \
  tightenco/ziggy \
  spatie/laravel-medialibrary \
  barryvdh/laravel-dompdf \
  maatwebsite/excel \
  razorpay/razorpay
```

### 1.5 Install additional yarn packages

```bash
yarn add \
  @inertiajs/react \
  react \
  react-dom \
  axios \
  chart.js \
  react-chartjs-2 \
  react-toastify \
  clsx \
  lucide-react \
  swiper
```

### 1.6 Publish configs

```bash
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

---

## Phase 2 – Database: MongoDB → MySQL Migrations

Map each Mongoose schema to an Eloquent migration.

### 2.1 Migration Reference Table

| MongoDB Collection | Laravel Migration | Primary Keys / Relations |
|---|---|---|
| `users` | `create_users_table` | `id`, standard Laravel |
| `addresses` | `create_addresses_table` | `user_id FK`, flattens embedded array |
| `categories` | `create_categories_table` | `id` |
| `brands` | `create_brands_table` | `id` |
| `products` | `create_products_table` | `category_id FK`, `brand_id FK` |
| `product_images` | `create_product_images_table` | `product_id FK` (replaces image array) |
| `carts` | `create_carts_table` + `create_cart_items_table` | `user_id FK`, `product_id FK` |
| `wishlists` | `create_wishlists_table` + `create_wishlist_items_table` | `user_id FK`, `product_id FK` |
| `orders` | `create_orders_table` + `create_order_items_table` | `user_id FK`, `product_id FK` |
| `wallets` | `create_wallets_table` | `user_id FK` |
| `wallet_transactions` | `create_wallet_transactions_table` | `wallet_id FK` |
| `coupons` | `create_coupons_table` | `id` |
| `banners` | `create_banners_table` | `id` |

### 2.2 `users` migration

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('mobile');
    $table->string('image')->nullable();
    $table->string('password');
    $table->string('referral_code')->unique();
    $table->boolean('is_admin')->default(false);
    $table->boolean('is_verified')->default(false);
    $table->boolean('is_blocked')->default(false);
    $table->boolean('is_bonus_eligible')->default(false);
    $table->boolean('active')->default(true);
    $table->string('otp')->nullable();
    $table->timestamp('otp_expires_at')->nullable();
    $table->rememberToken();
    $table->timestamps();
});
```

### 2.3 `products` migration

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('product_name');
    $table->decimal('product_price', 10, 2);
    $table->decimal('product_offer', 5, 2)->default(0);  // percentage
    $table->decimal('offer', 5, 2)->default(0);           // category offer
    $table->decimal('product_sales_price', 10, 2);
    $table->unsignedInteger('quantity');
    $table->foreignId('brand_id')->constrained('brands')->cascadeOnDelete();
    $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
    $table->boolean('is_listed')->default(true);
    $table->boolean('is_deleted')->default(false);
    $table->timestamps();
});

Schema::create('product_images', function (Blueprint $table) {
    $table->id();
    $table->foreignId('product_id')->constrained()->cascadeOnDelete();
    $table->string('image_path');
    $table->boolean('is_primary')->default(false);
    $table->timestamps();
});
```

### 2.4 `orders` migration

```php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->string('order_id')->unique();  // keeps human-readable ID
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    // Shipping address snapshot (denormalised, just like Mongoose)
    $table->string('shipping_address');
    $table->string('shipping_town');
    $table->string('shipping_country');
    $table->string('shipping_state');
    $table->string('shipping_postal_code');
    $table->string('shipping_email');
    $table->string('shipping_phone');
    $table->string('payment_method');
    $table->decimal('total_amount', 10, 2);
    $table->enum('status', ['Pending','Shipped','Delivered','Cancelled','Returned'])
          ->default('Pending');
    $table->text('reason_response')->nullable();
    $table->timestamp('delivered_at')->nullable();
    $table->timestamps();
});

Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->cascadeOnDelete();
    $table->foreignId('product_id')->constrained()->restrictOnDelete();
    $table->string('product_name');
    $table->decimal('product_price', 10, 2);
    $table->decimal('product_total', 10, 2);
    $table->unsignedInteger('quantity');
    $table->timestamps();
});
```

### 2.5 `wallets` + `wallet_transactions`

```php
Schema::create('wallets', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
    $table->decimal('balance', 10, 2)->default(0);
    $table->timestamps();
});

Schema::create('wallet_transactions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('wallet_id')->constrained()->cascadeOnDelete();
    $table->string('type');       // 'credit' | 'debit'
    $table->string('order_type')->nullable();
    $table->decimal('amount', 10, 2);
    $table->timestamps();
});
```

### 2.6 `coupons`

```php
Schema::create('coupons', function (Blueprint $table) {
    $table->id();
    $table->string('coupon_code')->unique();
    $table->text('description');
    $table->string('coupon_display')->nullable();
    $table->decimal('discount', 5, 2);         // percentage 0-100
    $table->decimal('max_discount', 10, 2)->nullable();
    $table->decimal('min_amount', 10, 2)->nullable();
    $table->timestamp('expiration_date');
    $table->boolean('is_listed')->default(false);
    $table->timestamps();
});
```

---

## Phase 3 – Eloquent Models

### 3.1 User model (`app/Models/User.php`)

```php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name','email','mobile','image','password',
        'referral_code','is_admin','is_verified',
        'is_blocked','is_bonus_eligible','active',
        'otp','otp_expires_at',
    ];

    protected $hidden = ['password','remember_token'];

    protected $casts = [
        'is_admin' => 'boolean',
        'is_verified' => 'boolean',
        'is_blocked' => 'boolean',
        'is_bonus_eligible' => 'boolean',
        'active' => 'boolean',
        'otp_expires_at' => 'datetime',
    ];

    public function addresses()   { return $this->hasMany(Address::class); }
    public function cart()        { return $this->hasOne(Cart::class); }
    public function orders()      { return $this->hasMany(Order::class); }
    public function wishlist()    { return $this->hasOne(Wishlist::class); }
    public function wallet()      { return $this->hasOne(Wallet::class); }
}
```

### 3.2 Product model

```php
class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_name','product_price','product_offer',
        'offer','product_sales_price','quantity',
        'brand_id','category_id','is_listed',
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'product_sales_price' => 'decimal:2',
        'product_offer' => 'decimal:2',
        'offer' => 'decimal:2',
    ];

    public function brand()    { return $this->belongsTo(Brand::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function images()   { return $this->hasMany(ProductImage::class); }
    public function primaryImage() {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }
}
```

### 3.3 Order model

```php
class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id','user_id','shipping_address','shipping_town',
        'shipping_country','shipping_state','shipping_postal_code',
        'shipping_email','shipping_phone','payment_method',
        'total_amount','status','reason_response','delivered_at',
    ];

    protected $casts = ['total_amount' => 'decimal:2', 'delivered_at' => 'datetime'];

    public function user()   { return $this->belongsTo(User::class); }
    public function items()  { return $this->hasMany(OrderItem::class); }
}
```

### 3.4 Wallet model

```php
class Wallet extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','balance'];
    protected $casts = ['balance' => 'decimal:2'];

    public function user()         { return $this->belongsTo(User::class); }
    public function transactions() { return $this->hasMany(WalletTransaction::class); }

    public function credit(float $amount, string $orderType = null): void
    {
        $this->increment('balance', $amount);
        $this->transactions()->create(['type'=>'credit','order_type'=>$orderType,'amount'=>$amount]);
    }

    public function debit(float $amount, string $orderType = null): void
    {
        if ($this->balance < $amount) throw new \Exception('Insufficient wallet balance');
        $this->decrement('balance', $amount);
        $this->transactions()->create(['type'=>'debit','order_type'=>$orderType,'amount'=>$amount]);
    }
}
```

---

## Phase 4 – Laravel Routes (web.php)

Replace Express routes with Laravel web routes in a **monolith** style (no API layer).

```php
// routes/web.php

// ── AUTH ────────────────────────────────────────────────────────────────────
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/otp', [AuthController::class, 'showOtp'])->name('otp');
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
Route::get('/forgot-password', [AuthController::class, 'showForgot'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendForgotOtp']);
Route::get('/forgot-otp', [AuthController::class, 'showForgotOtp']);
Route::post('/verify-forgot-otp', [AuthController::class, 'verifyForgotOtp']);
Route::post('/resend-forgot-otp', [AuthController::class, 'resendForgotOtp']);
Route::get('/reset-password', [AuthController::class, 'showReset'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// ── USER (protected) ────────────────────────────────────────────────────────
Route::middleware(['auth', 'user.active'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/watches', [HomeController::class, 'watches'])->name('watches');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::post('/search', [HomeController::class, 'search'])->name('search');

    // Cart
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/add', [CartController::class, 'add'])->name('add');
        Route::delete('/remove/{product}', [CartController::class, 'remove'])->name('remove');
        Route::post('/update-quantity/{operation}', [CartController::class, 'updateQuantity'])->name('update-quantity');
        Route::post('/check-quantity', [CartController::class, 'checkQuantity'])->name('check-quantity');
        Route::get('/checkout', [CartController::class, 'checkout'])->name('checkout');
    });

    // Wishlist
    Route::prefix('wishlist')->name('wishlist.')->group(function () {
        Route::get('/', [WishlistController::class, 'index'])->name('index');
        Route::post('/add', [WishlistController::class, 'add'])->name('add');
        Route::delete('/remove/{product}', [WishlistController::class, 'remove'])->name('remove');
    });

    // Orders
    Route::prefix('orders')->name('orders.')->group(function () {
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
    Route::prefix('addresses')->name('addresses.')->group(function () {
        Route::get('/', [AddressController::class, 'index'])->name('index');
        Route::post('/', [AddressController::class, 'store'])->name('store');
        Route::get('/{address}/edit', [AddressController::class, 'edit'])->name('edit');
        Route::put('/{address}', [AddressController::class, 'update'])->name('update');
        Route::post('/set-default', [AddressController::class, 'setDefault'])->name('set-default');
        Route::post('/checkout-select', [AddressController::class, 'checkoutSelect'])->name('checkout-select');
        Route::post('/save-checkout', [AddressController::class, 'saveCheckout'])->name('save-checkout');
    });

    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');

    // Wallet
    Route::prefix('wallet')->name('wallet.')->group(function () {
        Route::get('/history', [WalletController::class, 'history'])->name('history');
        Route::post('/add-money', [WalletController::class, 'addMoney'])->name('add-money');
        Route::post('/verify-add-money', [WalletController::class, 'verifyAddMoney'])->name('verify-add-money');
    });

    // Coupons
    Route::post('/apply-coupon', [CouponController::class, 'apply'])->name('coupon.apply');
});

// ── ADMIN (protected by admin middleware) ───────────────────────────────────
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::get('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Users
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('index');
            Route::post('/{user}/block', [AdminUserController::class, 'block'])->name('block');
            Route::post('/{user}/unblock', [AdminUserController::class, 'unblock'])->name('unblock');
        });

        // Categories
        Route::resource('categories', AdminCategoryController::class);
        Route::post('/categories/{category}/toggle-list', [AdminCategoryController::class, 'toggleList']);

        // Brands
        Route::resource('brands', AdminBrandController::class);
        Route::post('/brands/{brand}/toggle-list', [AdminBrandController::class, 'toggleList']);

        // Products
        Route::resource('products', AdminProductController::class);
        Route::post('/products/{product}/toggle-list', [AdminProductController::class, 'toggleList']);

        // Orders
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::post('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update-status');

        // Coupons
        Route::resource('coupons', AdminCouponController::class);
        Route::post('/coupons/{coupon}/toggle-list', [AdminCouponController::class, 'toggleList']);

        // Banners
        Route::resource('banners', AdminBannerController::class);

        // Sales Reports
        Route::get('/sales-report', [SalesReportController::class, 'index'])->name('sales-report.index');
        Route::get('/sales-report/download/{type}', [SalesReportController::class, 'download'])->name('sales-report.download');
    });
});
```

---

## Phase 5 – Controllers

### 5.1 Naming Convention

All controllers return `Inertia::render('PageName', $data)` instead of `res.render('view', data)`.

| Node.js Controller | Laravel Controller | Inertia Page |
|---|---|---|
| `userController.js` | `AuthController`, `ProfileController`, `HomeController` | `Auth/*`, `User/Profile`, `User/Home` |
| `cartController.js` | `CartController` | `User/Cart`, `User/Checkout` |
| `orderController.js` | `OrderController` | `User/OrderComplete`, `User/OrderList` |
| `addressController.js` | `AddressController` | `User/Address`, `User/AddressList` |
| `wishListController.js` | `WishlistController` | `User/Wishlist` |
| `couponController.js` | `CouponController` (user apply) + `AdminCouponController` | `Admin/Coupons` |
| `adminController.js` | `AdminDashboardController`, `AdminUserController` | `Admin/Dashboard`, `Admin/Users` |
| `productController.js` | `ProductController` (user view) + `AdminProductController` | `Admin/Products` |
| `categoryController.js` | `AdminCategoryController` | `Admin/Categories` |
| `salesReportController.js` | `SalesReportController` | `Admin/SalesReport` |
| `bannerController.js` | `AdminBannerController` | `Admin/Banners` |

### 5.2 Example – CartController

```php
class CartController extends Controller
{
    public function index(): Response
    {
        $cart = Cart::with('items.product.images')
            ->where('user_id', auth()->id())->first();

        return Inertia::render('User/Cart', [
            'cart' => $cart,
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1',
        ]);

        $service = new CartService();
        $service->addItem(auth()->user(), $request->product_id, $request->quantity ?? 1);

        return back()->with('success', 'Item added to cart.');
    }

    public function remove(Product $product): RedirectResponse
    {
        (new CartService())->removeItem(auth()->user(), $product->id);
        return back()->with('success', 'Item removed.');
    }

    public function updateQuantity(Request $request, string $operation): JsonResponse
    {
        $qty = (new CartService())->updateQuantity(
            auth()->user(), $request->product_id, $operation
        );
        return response()->json(['quantity' => $qty]);
    }

    public function checkout(): Response
    {
        $cart      = Cart::with('items.product')->where('user_id', auth()->id())->first();
        $addresses = Address::where('user_id', auth()->id())->get();
        $coupons   = Coupon::active()->get();
        $wallet    = Wallet::firstOrCreate(['user_id' => auth()->id()]);

        return Inertia::render('User/Checkout', compact('cart','addresses','coupons','wallet'));
    }
}
```

### 5.3 Example – OrderController (Razorpay)

```php
public function placeOnline(Request $request): JsonResponse
{
    $request->validate(['cart_id' => 'required', 'address_id' => 'required']);

    $razorpay = new \Razorpay\Api\Api(config('services.razorpay.key'), config('services.razorpay.secret'));

    $cart = Cart::findOrFail($request->cart_id);

    $razorpayOrder = $razorpay->order->create([
        'receipt'  => 'order_'.time(),
        'amount'   => $cart->cart_subtotal * 100,  // paise
        'currency' => 'INR',
    ]);

    // Store pending order
    $order = $this->createOrder($request, 'Razorpay', $razorpayOrder['id']);

    return response()->json([
        'razorpay_order_id' => $razorpayOrder['id'],
        'amount'            => $cart->cart_subtotal * 100,
        'key'               => config('services.razorpay.key'),
        'order_id'          => $order->id,
    ]);
}

public function verifyPayment(Request $request): RedirectResponse
{
    $api = new \Razorpay\Api\Api(config('services.razorpay.key'), config('services.razorpay.secret'));

    try {
        $api->utility->verifyPaymentSignature([
            'razorpay_order_id'   => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature'  => $request->razorpay_signature,
        ]);

        Order::where('razorpay_order_id', $request->razorpay_order_id)
             ->update(['status' => 'Pending', 'payment_verified' => true]);

        return redirect()->route('orders.complete')->with('success','Payment verified!');
    } catch (\Exception $e) {
        return back()->with('error', 'Payment verification failed.');
    }
}
```

---

## Phase 6 – Middleware

### 6.1 Middleware Map

| Node.js Middleware | Laravel Middleware | Purpose |
|---|---|---|
| `userAuth.isLogin` | `auth` (built-in) | Must be logged in |
| `userAuth.isLogout` | `guest` (built-in) | Must be guest |
| `userAuth.isBlock` | `App\Http\Middleware\CheckUserActive` | Block suspended users |
| `adminAuth.isLogin` | `App\Http\Middleware\AdminMiddleware` | Must have `is_admin = true` |
| `adminAuth.isLogout` | `guest` on admin routes | Admin must be guest |

### 6.2 CheckUserActive middleware

```php
class CheckUserActive
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->is_blocked) {
            auth()->logout();
            return redirect()->route('login')->withErrors(['account' => 'Your account has been blocked.']);
        }
        return $next($request);
    }
}
```

### 6.3 AdminMiddleware

```php
class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->is_admin) {
            return redirect()->route('admin.login');
        }
        return $next($request);
    }
}
```

---

## Phase 7 – Services (Business Logic Layer)

Extracted from controllers into dedicated service classes under `app/Services/`:

```
app/Services/
├── AuthService.php        # OTP generation, verification, referral codes
├── CartService.php        # Add/remove/update cart items, subtotal calc
├── OrderService.php       # Place order, cancel, return, status update
├── WalletService.php      # Credit/debit, add money via Razorpay
├── CouponService.php      # Validate and apply coupon to cart
├── InvoiceService.php     # Generate PDF invoice via DomPDF
├── SalesReportService.php # Build report data + export Excel/PDF
└── RazorpayService.php    # Razorpay order creation + verification
```

### 7.1 CartService

```php
class CartService
{
    public function addItem(User $user, int $productId, int $qty = 1): Cart
    {
        $product = Product::findOrFail($productId);

        if ($product->quantity < $qty) {
            throw new \Exception('Insufficient stock.');
        }

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $existingItem = $cart->items()->where('product_id', $productId)->first();

        if ($existingItem) {
            $newQty = $existingItem->quantity + $qty;
            if ($product->quantity < $newQty) throw new \Exception('Insufficient stock.');
            $existingItem->update([
                'quantity'      => $newQty,
                'product_total' => $product->product_sales_price * $newQty,
            ]);
        } else {
            $cart->items()->create([
                'product_id'    => $product->id,
                'product_name'  => $product->product_name,
                'product_price' => $product->product_sales_price,
                'quantity'      => $qty,
                'product_total' => $product->product_sales_price * $qty,
            ]);
        }

        $this->recalculate($cart);

        return $cart->fresh('items');
    }

    public function recalculate(Cart $cart): void
    {
        $subtotal = $cart->items()->sum('product_total');
        $cart->update(['cart_subtotal' => $subtotal]);
    }

    public function removeItem(User $user, int $productId): void
    {
        $cart = Cart::where('user_id', $user->id)->first();
        $cart?->items()->where('product_id', $productId)->delete();
        if ($cart) $this->recalculate($cart);
    }
}
```

### 7.2 OTP / Auth Service

```php
class AuthService
{
    public function generateAndSendOtp(User $user): void
    {
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->update(['otp' => $otp, 'otp_expires_at' => now()->addMinutes(10)]);
        Mail::to($user->email)->send(new OtpMail($otp));
    }

    public function verifyOtp(User $user, string $otp): bool
    {
        if ($user->otp !== $otp || now()->isAfter($user->otp_expires_at)) {
            return false;
        }
        $user->update(['is_verified' => true, 'otp' => null, 'otp_expires_at' => null]);
        return true;
    }

    public function generateReferralCode(): string
    {
        do {
            $code = strtoupper(\Str::random(8));
        } while (User::where('referral_code', $code)->exists());
        return $code;
    }
}
```

---

## Phase 8 – Inertia React Pages (Atomic Design)

### 8.1 Atom: Button

```jsx
// resources/js/Components/atoms/Button.jsx
import { clsx } from 'clsx';

const variants = {
  primary:   'bg-indigo-600 hover:bg-indigo-700 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  danger:    'bg-red-600 hover:bg-red-700 text-white',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-600',
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, className = '', ...props
}) {
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' };
  return (
    <button
      className={clsx(
        'rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
}
```

### 8.2 Atom: Input

```jsx
// resources/js/Components/atoms/Input.jsx
import { clsx } from 'clsx';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border border-gray-300 px-3 py-2',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
        'transition duration-150',
        error && 'border-red-500',
        className
      )}
      {...props}
    />
  );
}
```

### 8.3 Molecule: FormField

```jsx
// resources/js/Components/molecules/FormField.jsx
import Label from '@/Components/atoms/Label';
import Input from '@/Components/atoms/Input';

export default function FormField({ label, id, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} error={error} {...inputProps} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

### 8.4 Molecule: ProductCard

```jsx
// resources/js/Components/molecules/ProductCard.jsx
import { Link, useForm } from '@inertiajs/react';
import Badge from '@/Components/atoms/Badge';
import Price from '@/Components/atoms/Price';
import Button from '@/Components/atoms/Button';

export default function ProductCard({ product }) {
  const { post, processing } = useForm();

  const addToCart = () => post(route('cart.add'), { product_id: product.id });

  return (
    <div className="group rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={route('products.show', product.id)} className="block overflow-hidden">
        <img
          src={`/storage/${product.images?.[0]?.image_path}`}
          alt={product.product_name}
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        {product.product_offer > 0 && (
          <Badge variant="success">{product.product_offer}% OFF</Badge>
        )}
        <h3 className="font-semibold text-gray-800 truncate">{product.product_name}</h3>
        <Price original={product.product_price} sale={product.product_sales_price} />
        <Button onClick={addToCart} loading={processing} size="sm">Add to Cart</Button>
      </div>
    </div>
  );
}
```

### 8.5 Organism: Navbar

```jsx
// resources/js/Components/organisms/Navbar.jsx
import { Link, usePage } from '@inertiajs/react';
import Avatar from '@/Components/atoms/Avatar';
import { ShoppingCart, Heart, User } from 'lucide-react';

export default function Navbar() {
  const { auth, cartCount } = usePage().props;
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={route('home')} className="text-2xl font-bold text-indigo-600 tracking-tight">
          TikTik
        </Link>
        <div className="flex items-center gap-5">
          <Link href={route('wishlist.index')} className="relative hover:text-indigo-600 transition-colors">
            <Heart size={22} />
          </Link>
          <Link href={route('cart.index')} className="relative hover:text-indigo-600 transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {auth?.user ? (
            <Link href={route('profile.show')}>
              <Avatar src={auth.user.image} name={auth.user.name} size="sm" />
            </Link>
          ) : (
            <Link href={route('login')} className="text-sm font-medium text-indigo-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

### 8.6 Template: UserLayout

```jsx
// resources/js/Components/templates/UserLayout.jsx
import Navbar from '@/Components/organisms/Navbar';
import { Toaster } from 'react-toastify';

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TikTik Store. All rights reserved.
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
```

### 8.7 Page: User/Cart

```jsx
// resources/js/Pages/User/Cart.jsx
import UserLayout from '@/Components/templates/UserLayout';
import CartSummary from '@/Components/organisms/CartSummary';
import Button from '@/Components/atoms/Button';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Cart({ cart }) {
  return (
    <UserLayout>
      <Head title="My Cart" />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      {cart && cart.items?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartSummary cart={cart} />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm h-fit">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{cart.cart_subtotal}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>₹{cart.cart_subtotal}</span>
            </div>
            <Button as={Link} href={route('cart.checkout')} className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Button as={Link} href={route('home')}>Continue Shopping</Button>
        </div>
      )}
    </UserLayout>
  );
}
```

### 8.8 Page: Admin/Dashboard

```jsx
// resources/js/Pages/Admin/Dashboard.jsx
import AdminLayout from '@/Components/templates/AdminLayout';
import { Head } from '@inertiajs/react';
import SalesChart from '@/Components/organisms/SalesChart';

export default function Dashboard({ stats, salesData }) {
  const cards = [
    { label: 'Total Orders',   value: stats.total_orders,   color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Total Revenue',  value: `₹${stats.revenue}`,  color: 'bg-green-50 text-green-700' },
    { label: 'Active Users',   value: stats.users,          color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Total Products', value: stats.products,       color: 'bg-purple-50 text-purple-700' },
  ];
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`rounded-xl p-5 ${c.color}`}>
            <p className="text-sm font-medium opacity-75">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Sales Overview</h2>
        <SalesChart data={salesData} />
      </div>
    </AdminLayout>
  );
}
```

---

## Phase 9 – HandleInertiaRequests Middleware (Shared Props)

```php
// app/Http/Middleware/HandleInertiaRequests.php

public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user() ? [
                'id'       => $request->user()->id,
                'name'     => $request->user()->name,
                'email'    => $request->user()->email,
                'image'    => $request->user()->image,
                'is_admin' => $request->user()->is_admin,
            ] : null,
        ],
        'cartCount' => fn () => $request->user()
            ? Cart::where('user_id', $request->user()->id)
                ->withCount('items')->first()?->items_count ?? 0
            : 0,
        'flash' => [
            'success' => session('success'),
            'error'   => session('error'),
        ],
        'ziggy' => fn () => (new Ziggy)->toArray(),
    ]);
}
```

---

## Phase 10 – File Uploads (Multer → Laravel Storage)

### 10.1 Config

```php
// config/filesystems.php  (add disk)
'product_images' => [
    'driver' => 'local',
    'root'   => storage_path('app/public/products'),
    'url'    => env('APP_URL').'/storage/products',
    'visibility' => 'public',
],
```

### 10.2 Storing images in controller

```php
public function store(Request $request): RedirectResponse
{
    $request->validate([
        'product_name'  => 'required|string|max:255',
        'product_price' => 'required|numeric|min:0',
        'images'        => 'required|array|min:1|max:4',
        'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        'category_id'   => 'required|exists:categories,id',
        'brand_id'      => 'required|exists:brands,id',
    ]);

    $product = Product::create($request->except('images'));

    foreach ($request->file('images') as $index => $image) {
        $path = $image->store('products', 'public');
        $product->images()->create([
            'image_path' => $path,
            'is_primary'  => $index === 0,
        ]);
    }

    // Run artisan storage:link once at setup
    return redirect()->route('admin.products.index')->with('success', 'Product created.');
}
```

---

## Phase 11 – Invoice PDF (Puppeteer → DomPDF)

```php
// app/Http/Controllers/OrderController.php

public function invoice(Request $request): Response
{
    $order = Order::with(['items.product','user'])
        ->where('user_id', auth()->id())
        ->where('order_id', $request->order_id)
        ->firstOrFail();

    $pdf = PDF::loadView('pdf.invoice', compact('order'));

    return $pdf->download("invoice-{$order->order_id}.pdf");
}
```

Create Blade template at `resources/views/pdf/invoice.blade.php` (used only for DomPDF rendering; not an Inertia page).

---

## Phase 12 – Sales Report (exceljs → Maatwebsite Excel)

```php
// app/Exports/SalesReportExport.php

class SalesReportExport implements FromCollection, WithHeadings
{
    public function __construct(private string $type, private $from, private $to) {}

    public function collection(): Collection
    {
        return Order::with('user')
            ->whereBetween('created_at', [$this->from, $this->to])
            ->get()
            ->map(fn($o) => [
                $o->order_id, $o->user->name, $o->total_amount,
                $o->payment_method, $o->status, $o->created_at->format('d M Y'),
            ]);
    }

    public function headings(): array
    {
        return ['Order ID','Customer','Amount','Payment','Status','Date'];
    }
}

// In Controller:
public function download(string $type): BinaryFileResponse
{
    $from = request('from', now()->startOfMonth());
    $to   = request('to', now());

    return $type === 'excel'
        ? Excel::download(new SalesReportExport($type, $from, $to), 'sales.xlsx')
        : PDF::loadView('pdf.sales-report', compact('from','to'))->download('sales.pdf');
}
```

---

## Phase 13 – Environment & Configuration

### 13.1 `.env` additions

```ini
APP_NAME="TikTik Store"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tiktiknew
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_ADDRESS=noreply@tiktik.com
MAIL_FROM_NAME="TikTik Store"

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

FILESYSTEM_DISK=public
```

### 13.2 `config/services.php`

```php
'razorpay' => [
    'key'    => env('RAZORPAY_KEY'),
    'secret' => env('RAZORPAY_SECRET'),
],
```

---

## Phase 14 – vite.config.js (yarn-based)

```js
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', 'resources/css/app.css'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
```

### 14.1 `package.json` (yarn managed)

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev":   "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@inertiajs/react": "^1.0.0",
    "axios":            "^1.6.0",
    "chart.js":         "^4.4.0",
    "clsx":             "^2.0.0",
    "lucide-react":     "^0.300.0",
    "react":            "^18.2.0",
    "react-chartjs-2":  "^5.2.0",
    "react-dom":        "^18.2.0",
    "react-toastify":   "^9.1.0",
    "swiper":           "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "laravel-vite-plugin":  "^1.0.0",
    "vite":                 "^5.0.0"
  }
}
```

---

## Phase 15 – Seeder

```php
// database/seeders/AdminSeeder.php

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@tiktik.com'],
            [
                'name'          => 'Admin',
                'mobile'        => '9999999999',
                'password'      => Hash::make('admin@123'),
                'referral_code' => 'ADMIN001',
                'is_admin'      => true,
                'is_verified'   => true,
                'active'        => true,
            ]
        );
    }
}
```

---

## Phase 16 – Full Execution Checklist

Run these commands in order after writing all files:

```bash
# 1. Create project
composer create-project laravel/laravel tiktiknew-laravel
cd tiktiknew-laravel

# 2. PHP packages
composer require laravel/breeze --dev
php artisan breeze:install react --typescript=no
composer require inertiajs/inertia-laravel tightenco/ziggy \
  barryvdh/laravel-dompdf maatwebsite/excel razorpay/razorpay

# 3. JS packages via yarn
yarn install
yarn add @inertiajs/react react react-dom axios chart.js react-chartjs-2 \
  clsx lucide-react react-toastify swiper
yarn add -D @vitejs/plugin-react vite laravel-vite-plugin

# 4. Publish vendor assets
php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config

# 5. Configure .env (DB, mail, razorpay)

# 6. Run migrations + seed
php artisan migrate:fresh --seed

# 7. Link storage
php artisan storage:link

# 8. Start dev servers
php artisan serve &
yarn dev
```

---

## Implementation Order (strict)

1. **Scaffold** → Phase 1 (composer create-project, breeze, yarn install)
2. **Database** → Phase 2 (all migrations)
3. **Models** → Phase 3 (all Eloquent models + relations)
4. **Routes** → Phase 4 (web.php)
5. **Middleware** → Phase 6 (CheckUserActive, AdminMiddleware)
6. **Services** → Phase 7 (CartService, AuthService, etc.)
7. **Controllers** → Phase 5 (all controllers returning Inertia::render)
8. **Shared Props** → Phase 9 (HandleInertiaRequests)
9. **Frontend: Atoms** → Phase 8 (Button, Input, Badge, etc.)
10. **Frontend: Molecules** → Phase 8 (FormField, ProductCard, CartItem, etc.)
11. **Frontend: Organisms** → Phase 8 (Navbar, CartSummary, OrderList, etc.)
12. **Frontend: Templates** → Phase 8 (UserLayout, AdminLayout)
13. **Frontend: Pages** → Phase 8 (all Inertia pages)
14. **Uploads** → Phase 10
15. **PDF / Excel** → Phases 11–12
16. **Config & Env** → Phase 13–14
17. **Seed** → Phase 15
18. **Verify** → Phase 16 checklist

---

## Key Rules

1. **Never create an API layer** – all data flows through Inertia props and Laravel form submissions.
2. **Always use `yarn`** for JS dependency management (never `npm install`).
3. **Always use `composer`** for PHP dependency management.
4. **Respect Atomic Design strictly** – atoms are reusable with zero business logic; molecules compose atoms; organisms may use Inertia hooks; pages are the only Inertia entry points.
5. **No raw SQL** – use Eloquent ORM exclusively.
6. **Flash messages** flow through shared props via `HandleInertiaRequests`.
7. **Route model binding** replaces manual `findById` calls from the Node.js controllers.
8. **One migration per table** – keep them small and reversible.
9. **Images stored in `storage/app/public`** and accessed via symlink (`php artisan storage:link`).
10. **OTP logic** lives in `AuthService`, not in the controller.
