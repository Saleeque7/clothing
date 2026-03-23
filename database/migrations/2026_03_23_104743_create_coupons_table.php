<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code')->unique();
            $table->text('description');
            $table->string('coupon_display')->nullable();
            $table->decimal('discount', 5, 2); // percentage 0-100
            $table->decimal('max_discount', 10, 2)->nullable();
            $table->decimal('min_amount', 10, 2)->nullable();
            $table->timestamp('expiration_date');
            $table->boolean('is_listed')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
