<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'image', 'is_listed', 'is_deleted'];

    protected $casts = [
        'is_listed' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
