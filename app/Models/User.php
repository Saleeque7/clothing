<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'mobile', 'image', 'password', 
        'referral_code', 'is_admin', 'is_verified', 
        'is_blocked', 'is_bonus_eligible', 'active', 
        'otp', 'otp_expires_at'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'is_admin' => 'boolean',
        'is_verified' => 'boolean',
        'is_blocked' => 'boolean',
        'is_bonus_eligible' => 'boolean',
        'active' => 'boolean',
        'otp_expires_at' => 'datetime',
    ];

    public function addresses() { return $this->hasMany(Address::class); }
    public function cart() { return $this->hasOne(Cart::class); }
    public function orders() { return $this->hasMany(Order::class); }
    public function wishlist() { return $this->hasOne(Wishlist::class); }
    public function wallet() { return $this->hasOne(Wallet::class); }
}
