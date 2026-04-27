<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $roles = [
            ['id' => Role::CUSTOMER, 'name' => 'customer'],
            ['id' => Role::ADMIN, 'name' => 'admin'],
            ['id' => Role::DEVELOPER, 'name' => 'developer'],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(['id' => $role['id']], ['name' => $role['name']]);
        }

        $this->command->info('Roles seeded successfully.');
    }
}
