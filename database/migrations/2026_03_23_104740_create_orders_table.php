<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Shipping address snapshot
            $table->string('shipping_address');
            $table->string('shipping_town');
            $table->string('shipping_country');
            $table->string('shipping_state');
            $table->string('shipping_postal_code');
            $table->string('shipping_email');
            $table->string('shipping_phone');
            
            $table->string('payment_method');
            $table->string('razorpay_order_id')->nullable();
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Returned'])->default('Pending');
            $table->text('reason_response')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
