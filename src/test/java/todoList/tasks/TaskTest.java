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
	void test() {
		assertEquals("Read a book", task.getName());
		assertFalse(task.getStatus());
		assertEquals(LocalDateTime.of(2022, 05, 01, 14, 33, 48), task.getAddedTime());
		assertNull(task.getDoneTime());
		assertFalse(task.deadlineIsBetween(LocalDate.of(2022, 05, 01), LocalDate.of(2022, 05, 01)));
		
		task.setName("do excersice");
		assertEquals("do excersice", task.getName());
		
		task.setStatus(true);
		assertTrue(task.getStatus());
		
		task.setDoneTime(LocalDateTime.of(2022, 05, 01, 14, 33, 48));
		assertEquals(LocalDateTime.of(2022, 05, 01, 14, 33, 48), task.getDoneTime());
		
		task.setDeadline(LocalDateTime.of(2022, 05, 01, 20, 00, 00));
		assertTrue(task.deadlineIsBetween(LocalDate.of(2022, 05, 01), LocalDate.of(2022, 05, 04)));
		assertFalse(task.deadlineIsBetween(LocalDate.of(2022, 05, 02), LocalDate.of(2022, 05, 12)));
	}

}
