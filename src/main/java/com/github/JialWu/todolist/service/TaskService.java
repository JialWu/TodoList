package com.github.JialWu.todolist.service;

import java.time.LocalDate;
import java.util.List;

import com.github.JialWu.todolist.model.Task;

public interface TaskService {
	public Task saveTask(Task task);
	public List<Task> getAllTasks();
	public void deleteTask(int id);
	public Task updateTask(int id, Task task);
	public Task editTask(int id, Task task);
	public List<Task> getTasksByDueTime(LocalDate dueTime);
}
