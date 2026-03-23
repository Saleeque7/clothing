<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'saleeque00cr7@gmail.com'],
            [
                'name' => 'Admin User',
                'mobile' => '0000000000',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'is_verified' => true,
                'active' => true,
                'referral_code' => 'ADMIN001'
            ]
        );

        $this->command->info('Admin user created successfully.');
    }
}
