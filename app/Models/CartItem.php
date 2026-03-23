<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id', 'product_id', 'product_name', 
        'product_price', 'quantity', 'product_total'
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'product_total' => 'decimal:2',
        'quantity' => 'integer',
    ];

    public function cart() { return $this->belongsTo(Cart::class); }
    public function product() { return $this->belongsTo(Product::class); }
}
