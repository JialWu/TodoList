package todoList;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import static java.time.temporal.TemporalAdjusters.nextOrSame;

import todoList.tasks.Task;
import todoList.tasks.TaskFilter;
import todoList.tasks.TaskList;

public class Main {

	public static void main(String[] args) {
		// create a new task
		Task newTask = new Task("Read a book", LocalDateTime.now());
		//System.out.println(newTask.getName());
		// set new name
		newTask.setName("do excersice");
		//System.out.println(newTask.getName());
		
		// create a new list of tasks
		TaskList list = new TaskList();
		// add three new task
		list.addNewTask("laundry", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		list.addNewTask("read", LocalDateTime.of(2022, 04, 01, 14, 33, 48));
		list.addNewTask("swim", LocalDateTime.now());
		list.addNewTask("shower", LocalDateTime.now());
		// print all tasks in this list
		for(Task task: list.getList()) {
			System.out.println(task);
		}
		
		// change the name of one task
		list.updateName("swim", "read");
		// print all tasks
		for(Task task: list.getList()) {
			System.out.println(task);
		}
		
		// update the finish time of one task and its status
		list.updateDeadline("laundry", LocalDateTime.now());
		list.updateStatus("shower", true);
		// print all tasks
		for(Task task: list.getList()) {
			System.out.println(task);
		}
		
		LocalDateTime time = LocalDateTime.now();
		System.out.println(time.toLocalDate());
		
		try {
			for(Task task: list.getList()) {
				System.out.println(task.deadlineIsBetween(time.toLocalDate(), time.toLocalDate()));
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		
		TaskFilter taskFilter = new TaskFilter();
		// print all today list
		for(Task task: taskFilter.getToday(list)) {
			System.out.println("today : " + task);
		}
		
		// delete the task of shower
		list.deleteTask("shower");
		// print all tasks
		for(Task task: list.getList()) {
			System.out.println(task);
		}
		
		// print all today list
		try {
			for(Task task: taskFilter.getToday(list)) {
				System.out.println("today : " + task);
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		
		// print all today list
		try {
			for(Task task: taskFilter.getThisWeek(list)) {
				System.out.println("week : " + task);
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		
		

		LocalDate a = LocalDate.now();
		System.out.println(a.with(nextOrSame(DayOfWeek.SUNDAY)));
		
	}

}
