<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->decimal('cart_subtotal', 10, 2)->default(0);
            $table->decimal('coupon_discount', 5, 2)->nullable();  // percentage
            $table->decimal('discount_amount', 10, 2)->nullable(); // computed amount
            $table->string('applied_coupon_code')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
