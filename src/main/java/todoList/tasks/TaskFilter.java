package todoList.tasks;

import java.util.List;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.nextOrSame;
import static java.time.temporal.TemporalAdjusters.previousOrSame;
import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

import java.time.DayOfWeek;
import java.time.LocalDate;

public class TaskFilter {
	private LocalDate currentDate;
	
	public TaskFilter() {
		this.currentDate = LocalDate.now();
	}
	
	// not sure whether just show unfinished tasks
	public List<Task> getFromtoList(TaskList taskList, LocalDate dateStart, LocalDate dateEnd) {//throws NullPointerException {
		return taskList.getList().stream()
				.filter(task -> task.deadlineIsBetween(dateStart, dateEnd) == true)
				.collect(Collectors.toList());
	}
	
	// get all existing and unfinished Tasks of current day
	public List<Task> getToday(TaskList taskList) {	
		return getFromtoList(taskList, this.currentDate, this.currentDate);
	}
	
	// get all  tasks of current week
	public List<Task> getThisWeek(TaskList taskList) {
		return getFromtoList(taskList
				, this.currentDate.with(previousOrSame(DayOfWeek.MONDAY))
				, this.currentDate.with(nextOrSame(DayOfWeek.SUNDAY)));
	}
	
	// get all tasks of current month
	public List<Task> getThisMonth(TaskList taskList) {
		return getFromtoList(taskList
				, this.currentDate.with(firstDayOfMonth())
				, this.currentDate.with(lastDayOfMonth()));
	
	}
	
	
}
