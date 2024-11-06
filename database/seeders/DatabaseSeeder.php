<?php

namespace Database\Seeders;

use App\Models\History;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(50)->create()->each(function ($user) {

            History::factory(3)->create([
                'loggerable_id' => $user->id,
                'loggerable_type' => 'App\Models\User',
            ]);
        });
    }
}
