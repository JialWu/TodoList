package todoList.tasks;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class TaskListTest {
	TaskList taskList;
	List<Task> tList;
	Task task1;
	Task task2;
	Task task3;
	Task task4;

	@BeforeEach
	public void setUp() throws Exception {
		// create four tasks
		task1 = new Task("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		task2 = new Task("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		task3 = new Task("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		task4 = new Task("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48));
		// add the four tasks into the taskList
		taskList = new TaskList();
		taskList.addNewTask(task1);
		taskList.addNewTask(task2);
		taskList.addNewTask(task3);
		taskList.addNewTask(task4);
		// created a array list for comparison
		tList = new ArrayList<Task>();
		tList.add(task1);
		tList.add(task2);
		tList.add(task3);
		tList.add(task4);
	}
	
	@Test
	public void testAddTasks() {		
		assertTrue(tList.equals(taskList.getList()));
		
	}
	
	@Test
	public void testUpdateName() {		
		taskList.updateName("laundry", "run");
		task1.setName("run");
		assertTrue(tList.equals(taskList.getList()));
	}
	
	@Test
	public void testUpdateDeadline() {		
		taskList.updateDeadline("laundry",LocalDateTime.of(2022, 05, 06, 14, 33, 48));
		task1.setDeadline(LocalDateTime.of(2022, 05, 06, 14, 33, 48));
		assertTrue(tList.equals(taskList.getList()));
		
	}
	
	@Test
	public void testUpdateDonetime() {
		taskList.updateDoneTime("laundry",LocalDateTime.of(2022, 05, 06, 15, 33, 48));
		task1.setDoneTime(LocalDateTime.of(2022, 05, 06, 15, 33, 48));;
		assertTrue(tList.equals(taskList.getList()));
	}
	
	@Test
	public void testUpdateStatus() {
		taskList.updateStatus("laundry",true);
		task1.setStatus(true);;
		assertTrue(tList.containsAll(taskList.getList()));
	}
	
	@Test
	public void testdeleteTask() {
		taskList.deleteTask("laundry");
		tList.remove(task1);
		assertTrue(tList.containsAll(taskList.getList()));
	}


}
