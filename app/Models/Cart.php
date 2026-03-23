<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'cart_subtotal', 'coupon_discount', 
        'discount_amount', 'applied_coupon_code'
    ];

    protected $casts = [
        'cart_subtotal' => 'decimal:2',
        'coupon_discount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(CartItem::class); }
}
