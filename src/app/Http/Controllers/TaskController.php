<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{   
    public function index()
    {
      
        return Task::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in-progress,completed|sometimes', 
            'due_date' => 'nullable|date',
        ]);

       
        $task = Task::create($validated);
        return response()->json($task, 201); 
    }

   
    public function show(Task $task)
    {
        
        return $task;
    }

    
    public function update(Request $request, Task $task)
    {
       
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

     
        $task->update($validated);
        return response()->json($task, 200);
    }

    //delete
    public function destroy(Task $task)
    {
        $task->delete();
        
        return response()->json(null, 204);
    }
}