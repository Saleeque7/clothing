<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'coupon_code', 'description', 'coupon_display', 'discount', 
        'max_discount', 'min_amount', 'expiration_date', 'is_listed'
    ];

    protected $casts = [
        'discount' => 'decimal:2',
        'max_discount' => 'decimal:2',
        'min_amount' => 'decimal:2',
        'expiration_date' => 'datetime',
        'is_listed' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_listed', true)->where('expiration_date', '>', now());
    }
}
