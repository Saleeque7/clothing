<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'address', 'town', 'country', 'state', 
        'postal_code', 'email', 'phone_number', 'is_default'
    ];

    protected $casts = ['is_default' => 'boolean'];

    public function user() { return $this->belongsTo(User::class); }
}
