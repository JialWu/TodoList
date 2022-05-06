package todoList;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.nextOrSame;

import todoList.tasks.Task;
import todoList.tasks.TaskList;

public class Main {

	public static void main(String[] args) {
		LocalDate a = LocalDate.now();
		System.out.println(a.with(nextOrSame(DayOfWeek.SUNDAY)));
		
		TaskList taskList = new TaskList();
		Task task = new Task("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		
		taskList.addNewTask(task);

		List<Task> List = new ArrayList<Task>();
		List.add(task);
		//List.add(new Task("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48)));
		//Task task = new Task("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		//task.setDeadline(LocalDateTime.of(2022, 05, 06, 14, 33, 48));
		//List.add(task);
		//List.add(new Task("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48)));
		
		//boolean isEqual = Objects.equals(taskList.getList(), List);
		System.out.println(Objects.equals(taskList.getList(), List));
		
		for(Task t: taskList.getList()) {
			System.out.println(t.toString());
		}
		for(Task t2: List) {
			System.out.println(t2.toString());
		}
	    //List<ObjTwo> added = list2.stream().filter(o1 -> list.stream().noneMatch(o2 -> o2.getId().equals(o1.getId())))
	    //         .collect(Collectors.toList());

	    //System.out.print("removed ");
	    //added.forEach(System.out::println);
		

		List<Task> difference2 = taskList.getList().stream()
			    .filter(tsk -> !List.contains(tsk))//tsk.toString() == task.toString())
			    .collect(Collectors.toList());
		System.out.print(difference2.isEmpty());
		
		System.out.println(java.util.Objects.equals(task, taskList.getList()));
		System.out.println(List.containsAll(taskList.getList()));
	}

}
