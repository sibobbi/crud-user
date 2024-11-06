<?php

namespace Database\Factories;

use App\Enums\LoggerType;
use Illuminate\Database\Eloquent\Factories\Factory;


class HistoryFactory extends Factory
{

    public function definition(): array
    {
        $statuses = LoggerType::cases();


        $randomEvent = $statuses[array_rand($statuses)];

        return [
            'loggerable_type' => $this->faker->randomElement(['App\Models\User']),
            'loggerable_id' => \App\Models\User::factory(),
            'event' => $randomEvent->value,
            'description' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
