<?php

namespace App\Services;

use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;

class CartService
{
    public function addItem(User $user, int $productId, int $qty = 1): Cart
    {
        $product = Product::findOrFail($productId);

        if ($product->quantity < $qty) {
            throw new \Exception('Insufficient stock product: ' . $product->product_name);
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

    public function updateQuantity(User $user, int $productId, string $operation): int
    {
        $cart = Cart::where('user_id', $user->id)->first();
        if (!$cart) return 0;

        $item = $cart->items()->where('product_id', $productId)->first();
        if (!$item) return 0;

        $product = Product::findOrFail($productId);

        if ($operation === 'increment') {
            if ($product->quantity <= $item->quantity) throw new \Exception('Insufficient stock.');
            $item->increment('quantity');
        } else {
            if ($item->quantity > 1) {
                $item->decrement('quantity');
            }
        }

        $item->update(['product_total' => $item->product_price * $item->quantity]);
        $this->recalculate($cart);

        return $item->quantity;
    }
}
