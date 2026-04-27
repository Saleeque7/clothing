<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user('web') ? [
                    'id' => $request->user('web')->id,
                    'name' => $request->user('web')->name,
                    'email' => $request->user('web')->email,
                    'image' => $request->user('web')->image,
                    'is_admin' => $request->user('web')->is_admin,
                ] : null,
                'admin' => $request->user('admin') ? [
                    'id' => $request->user('admin')->id,
                    'name' => $request->user('admin')->name,
                    'email' => $request->user('admin')->email,
                ] : null,
                'developer' => $request->user('developer') ? [
                    'id' => $request->user('developer')->id,
                    'name' => $request->user('developer')->name,
                ] : null,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'cartCount' => $request->user() 
                ? \App\Models\CartItem::whereHas('cart', fn($q) => $q->where('user_id', $request->user()->id))->sum('quantity')
                : 0,
            'ziggy' => fn () => [
                ...(new \Tighten\Ziggy\Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
