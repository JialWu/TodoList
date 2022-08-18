package com.github.JialWu.todolist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.JialWu.todolist.model.Task;
import com.github.JialWu.todolist.repository.TaskRopository;

@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	private TaskRopository taskRepository;
	
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
//		currentTask.setName(task.getName());
		currentTask.setStatus(task.isStatus());
//		currentTask.setDueTime(task.getDueTime());
		return taskRepository.save(currentTask);
	}
	
}
