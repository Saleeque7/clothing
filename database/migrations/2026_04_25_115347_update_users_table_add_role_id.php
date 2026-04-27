<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add role_id FK after 'id', nullable so existing rows don't break
            $table->foreignId('role_id')->after('id')->nullable()->constrained('roles')->nullOnDelete();

            // Remove old boolean flag
            $table->dropColumn('is_admin');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
            $table->boolean('is_admin')->default(false)->after('referral_code');
        });
    }
};
