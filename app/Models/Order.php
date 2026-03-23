<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'user_id', 'shipping_address', 'shipping_town', 
        'shipping_country', 'shipping_state', 'shipping_postal_code', 
        'shipping_email', 'shipping_phone', 'payment_method', 
        'total_amount', 'status', 'reason_response', 'delivered_at'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'delivered_at' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(OrderItem::class); }
}
