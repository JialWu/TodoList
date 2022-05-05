package todoList.tasks;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.time.LocalDateTime;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class TaskListTest {
	TaskList taskList;
	private final PrintStream standardOut = System.out;
	private final ByteArrayOutputStream outputStreamCaptor = new ByteArrayOutputStream();
	@BeforeEach
	public void setUp() throws Exception {
		taskList = new TaskList();
	    System.setOut(new PrintStream(outputStreamCaptor));
	}
	
	@AfterEach
	public void tearDown() {
	    System.setOut(standardOut);
	}

	@Test
	public void testUpdateName() {
		taskList.addNewTask("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		taskList.addNewTask("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		taskList.addNewTask("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		taskList.addNewTask("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48));
		
		taskList.updateName("swim", "run");
		for(Task task: taskList.getList()) {
			System.out.println(task);
		}
	    Assert.assertEquals("laundry false 2022-04-28T10:33:20 null null\r\n" + 
	    		"research false 2022-05-01T14:33:48 null null\r\n" + 
	    		"run false 2022-05-05T14:33:48 null null\r\n" + 
	    		"shower false 2022-05-08T14:33:48 null null", outputStreamCaptor.toString()
	    	      .trim());
	}
	
	@Test
	public void testUpdateDeadline() {
		taskList.addNewTask("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		taskList.addNewTask("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		taskList.addNewTask("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		taskList.addNewTask("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48));
		
		taskList.updateDeadline("swim",LocalDateTime.of(2022, 05, 06, 14, 33, 48));
		for(Task task: taskList.getList()) {
			System.out.println(task);
		}
	    Assert.assertEquals("laundry false 2022-04-28T10:33:20 null null\r\n" + 
	    		"research false 2022-05-01T14:33:48 null null\r\n" + 
	    		"swim false 2022-05-05T14:33:48 2022-05-06T14:33:48 null\r\n" + 
	    		"shower false 2022-05-08T14:33:48 null null", outputStreamCaptor.toString()
	    	      .trim());
	}
	
	@Test
	public void testUpdateDonetime() {
		taskList.addNewTask("laundry", LocalDateTime.of(2022, 04, 28, 10, 33, 20));
		taskList.addNewTask("research", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		taskList.addNewTask("swim", LocalDateTime.of(2022, 05, 05, 14, 33, 48));
		taskList.addNewTask("shower", LocalDateTime.of(2022, 05, 8, 14, 33, 48));
		
		taskList.updateDoneTime("swim",LocalDateTime.of(2022, 05, 06, 15, 33, 48));
		for(Task task: taskList.getList()) {
			System.out.println(task);
		}
	    Assert.assertEquals("laundry false 2022-04-28T10:33:20 null null\r\n" + 
	    		"research false 2022-05-01T14:33:48 null null\r\n" + 
	    		"swim false 2022-05-05T14:33:48 null 2022-05-06T15:33:48\r\n" + 
	    		"shower false 2022-05-08T14:33:48 null null", outputStreamCaptor.toString()
	    	      .trim());
	}

}
