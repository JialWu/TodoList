package todoList.tasks;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TaskList {
	private List<Task> taskList;
	
	public TaskList() {
		this.taskList = new ArrayList<Task>();
	}
	
	public void addNewTask(String name, LocalDateTime timeCreated) {
		Task task = new Task(name, timeCreated);
		this.taskList.add(task);
	}
	
	private Task getTasktoUpdate(String name) {
		Task TasktoUpdate = this.taskList.stream()
				.filter(task -> task.getName().equals(name))
				.findAny()
				.orElse(null);
		return TasktoUpdate;
	}
	
	public void updateName(String oldName, String newName) {
		Task TasktoUpdate = this.getTasktoUpdate(oldName);
		//System.out.println(TasktoUpdate.toString());
		TasktoUpdate.setName(newName);
		//this.taskList.stream().filter(task -> );
	}
	
	public void updateDeadline(String Name, LocalDateTime timeDone) {
		Task TasktoUpdate = this.getTasktoUpdate(Name);
		TasktoUpdate.setDeadline(timeDone);
		//this.taskList.stream().filter(task -> );
	}
	
	public void updateDoneTime(String Name, LocalDateTime timeDone) {
		Task TasktoUpdate = this.getTasktoUpdate(Name);
		TasktoUpdate.setDoneTime(timeDone);
		//this.taskList.stream().filter(task -> );
	}
	
	public void updateStatus(String Name, boolean status) {
		Task TasktoUpdate = this.getTasktoUpdate(Name);
		TasktoUpdate.setStatus(status);
	}
	
	public void deleteTask(String Name) {
		this.taskList.removeIf(task -> task.getName() == Name);
	}
	
	//
	public List<Task> getList() {
		return this.taskList;
	}
	
	public void ListtoTaskList(List<Task> List) {
		this.taskList = List;
	}
}
