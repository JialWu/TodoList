package com.github.JialWu.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.JialWu.todolist.model.Task;
import com.github.JialWu.todolist.service.TaskService;

@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@PostMapping("/add")
	public String add(@RequestBody Task task) {
		taskService.saveTask(task);
		return "New task is added";
	}
	
	@GetMapping("/getAll")
	public List<Task> getAllTasks() {
		return taskService.getAllTasks();
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTask(@PathVariable("id") int id) {
		taskService.deleteTask(id);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable int id, @RequestBody Task task) {
		final Task updatedTask = taskService.updateTask(id, task);
	    return ResponseEntity.ok(updatedTask);
	}

}
