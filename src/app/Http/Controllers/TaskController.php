<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // index: GET /api/tasks - Fetch all tasks
    public function index()
    {
        // Simply return all tasks. Laravel automatically converts this to JSON.
        return Task::all();
    }

    // store: POST /api/tasks - Create a new task
    public function store(Request $request)
    {
        // 1. Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in-progress,completed|sometimes', // 'sometimes' allows default 'pending'
            'due_date' => 'nullable|date',
        ]);

        // 2. Create the task and return the new resource with a 201 status
        $task = Task::create($validated);
        return response()->json($task, 201); 
    }

    // show: GET /api/tasks/{task} - Get a specific task
    public function show(Task $task)
    {
        // Laravel's Route Model Binding automatically injects the Task object
        // (If the ID doesn't exist, it automatically throws a 404)
        return $task;
    }

    // update: PUT/PATCH /api/tasks/{task} - Update a specific task
    public function update(Request $request, Task $task)
    {
        // 1. Validate the request data. Rules are similar to 'store'.
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        // 2. Update the task
        $task->update($validated);
        return response()->json($task, 200);
    }

    // destroy: DELETE /api/tasks/{task} - Delete a specific task
    public function destroy(Task $task)
    {
        $task->delete();
        // Return a 204 No Content status, as is standard for successful deletions
        return response()->json(null, 204);
    }
}