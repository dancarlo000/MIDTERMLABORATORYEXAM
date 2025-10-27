<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['pending', 'in-progress', 'completed'];

        for ($i = 1; $i <= 20; $i++) {
            Task::create([
                'title' => 'Task ' . $i,
                'description' => 'This is the description for task ' . $i,
                'status' => $statuses[array_rand($statuses)],
                'due_date' => now()->addDays(rand(1, 30)),
            ]);
        }
    }
}
