<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Role ID Constants — mirrors resources/js/constants.js
    const CUSTOMER  = 1;
    const ADMIN     = 2;
    const DEVELOPER = 3;

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
