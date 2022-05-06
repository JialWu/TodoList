package todoList.tasks;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskTest {
	Task task;
	
	@BeforeEach
	void setUp() throws Exception {
		task = new Task("Read a book", LocalDateTime.of(2022, 05, 01, 14, 33, 48));
	}
	
	@Test
	void testInitial() {
		assertEquals("Read a book", task.getName());
		assertFalse(task.getStatus());
		assertEquals(task.getAddedTime(), LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		assertNull(task.getDoneTime());
		assertFalse(task.deadlineIsBetween(LocalDate.of(2022, 05, 01), LocalDate.of(2022, 05, 01)));
	}
	
	@Test
	void testSetName() {
		task.setName("do excersice");
		assertEquals("do excersice", task.getName());
	}

	@Test
	void testSetDoneTime() {
		task.setDoneTime(LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		assertEquals(LocalDateTime.of(2022, 05, 01, 14, 33, 48), task.getDoneTime());
	}
	
	@Test
	void testDeadline() {
		task.setDeadline(LocalDateTime.of(2022, 05, 01, 20, 00, 00));
		assertTrue(task.deadlineIsBetween(LocalDate.of(2022, 05, 01), LocalDate.of(2022, 05, 04)));
		assertFalse(task.deadlineIsBetween(LocalDate.of(2022, 05, 02), LocalDate.of(2022, 05, 12)));
	}
	
	@Test
	void testSetStatus() {
		task.setStatus(true);
		assertTrue(task.getStatus());
	}

}
