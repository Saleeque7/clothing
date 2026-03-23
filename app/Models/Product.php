<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name', 'product_price', 'product_offer', 
        'offer', 'product_sales_price', 'quantity', 
        'brand_id', 'category_id', 'is_listed', 'is_deleted'
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'product_offer' => 'decimal:2',
        'offer' => 'decimal:2',
        'product_sales_price' => 'decimal:2',
        'quantity' => 'integer',
        'is_listed' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    public function brand() { return $this->belongsTo(Brand::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function images() { return $this->hasMany(ProductImage::class); }
    public function primaryImage() { return $this->hasOne(ProductImage::class)->where('is_primary', true); }
}
