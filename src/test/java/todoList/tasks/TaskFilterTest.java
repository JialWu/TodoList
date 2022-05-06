package todoList.tasks;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskFilterTest {
	TaskFilter taskFilter;
	TaskList taskList;
	List<Task> tList;
	Task task1;
	Task task2;
	Task task3;
	Task task4;

	@BeforeEach
	void setUp() throws Exception {
		taskFilter = new TaskFilter(LocalDate.of(2022, 05, 07));
		// create four tasks
		task1 = new Task("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		task1.setDeadline(LocalDateTime.of(2022, 04, 28, 18, 33, 20));
		task2 = new Task("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		task2.setDeadline(LocalDateTime.of(2022, 05, 02, 10, 33, 20));
		task3 = new Task("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		task3.setDeadline(LocalDateTime.of(2022, 05, 07, 10, 33, 20));
		task4 = new Task("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48));
		task4.setDeadline(LocalDateTime.of(2022, 05, 9, 10, 33, 20));
		// add the four tasks into the taskList
		taskList = new TaskList();
		taskList.addNewTask(task1);
		taskList.addNewTask(task2);
		taskList.addNewTask(task3);
		taskList.addNewTask(task4);
		// created a array list for comparison
		tList = new ArrayList<Task>();
	}

	@Test
	void testFromtoList() {
		tList.add(task1);
		tList.add(task2);
		tList.add(task3);
		tList.add(task4);
		assertTrue(tList.equals(taskFilter.getFromtoList(taskList, LocalDate.of(2022, 4, 28), LocalDate.of(2022, 5, 9))));
	}
	
	@Test
	void testGetToday() {
		tList.add(task3);
		//taskFilter.getFromtoList(taskList, LocalDate.of(2022, 4, 29), LocalDate.of(2002, 5, 10));
		//System.out.println(tList);
		//System.out.println(taskList.getList());
		//
		System.out.println(taskFilter.getFromtoList(taskList, LocalDate.of(2022, 4, 1), LocalDate.of(2022, 6, 10)));
		//System.out.println(taskFilter.getThisWeek(taskList));
		assertTrue(tList.equals(taskFilter.getToday(taskList)));
	}
	
	@Test
	void testGetThisWeek() {
		tList.add(task2);
		tList.add(task3);
		assertTrue(tList.equals(taskFilter.getThisWeek(taskList)));
	}
	
	@Test
	void testGetThisMonth() {
		tList.add(task2);
		tList.add(task3);
		tList.add(task4);
		System.out.println(tList);
		//System.out.println(taskList.getList());
		System.out.println(taskFilter.getThisMonth(taskList));
		assertTrue(tList.equals(taskFilter.getThisMonth(taskList)));
	}

}
