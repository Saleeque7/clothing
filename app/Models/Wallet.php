<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'balance'];

    protected $casts = ['balance' => 'decimal:2'];

    public function user() { return $this->belongsTo(User::class); }
    public function transactions() { return $this->hasMany(WalletTransaction::class); }

    public function credit(float $amount, string $orderType = null)
    {
        $this->increment('balance', $amount);
        return $this->transactions()->create([
            'type' => 'Credit',
            'order_type' => $orderType,
            'amount' => $amount
        ]);
    }

    public function debit(float $amount, string $orderType = null)
    {
        if ($this->balance < $amount) throw new \Exception('Insufficient wallet balance');
        $this->decrement('balance', $amount);
        return $this->transactions()->create([
            'type' => 'Debit',
            'order_type' => $orderType,
            'amount' => $amount
        ]);
    }
}
