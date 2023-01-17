package com.github.JialWu.todolist.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.JialWu.todolist.model.Task;
import com.github.JialWu.todolist.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public Task saveTask(Task task) {
		return taskRepository.save(task);
	}
	
	@Override
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@Override
	public void deleteTask(int id) {
		taskRepository.deleteById(id);
	}

	@Override
	public Task updateTask(int id, Task task) {
		Task currentTask = taskRepository.findById(id).orElseThrow(RuntimeException::new);
		currentTask.setStatus(task.isStatus());
		return taskRepository.save(currentTask);
	}

	@Override
	public Task editTask(int id, Task task) {
		Task currentTask = taskRepository.findById(id).orElseThrow(RuntimeException::new);
		currentTask.setName(task.getName());
		currentTask.setDueTime(task.getDueTime());
		return taskRepository.save(currentTask);
	}

	@Override
	public List<Task> getTasksByDueTime(LocalDate dueTime) {
		return taskRepository.findUnfinishedWithDueTimeBefore(dueTime);
	}

}
