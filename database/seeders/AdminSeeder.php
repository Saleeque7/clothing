<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'saleeque00cr7@gmail.com'],
            [
                'name'          => 'Admin User',
                'mobile'        => '0000000000',
                'password'      => Hash::make('password'),
                'role_id'       => Role::ADMIN,
                'is_verified'   => true,
                'active'        => true,
                'referral_code' => 'ADMIN001',
            ]
        );

        // Developer user
        User::updateOrCreate(
            ['email' => 'dev@tiktiknew.com'],
            [
                'name'          => 'Developer User',
                'mobile'        => '1111111111',
                'password'      => Hash::make('devpassword'),
                'role_id'       => Role::DEVELOPER,
                'is_verified'   => true,
                'active'        => true,
                'referral_code' => 'DEV001',
            ]
        );

        $this->command->info('Admin and Developer users seeded successfully.');
    }
}
