package todoList.tasks;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.temporal.IsoFields;
//Given a LocalDateTime output the LocalDate, Week or Month
public class TimeManager {
	private LocalDate Date;
	
	public TimeManager(LocalDateTime localDateTime) {
		this.Date = localDateTime.toLocalDate().with(DayOfWeek.MONDAY);
	}
	
	public LocalDate getLocalDate() {
		return this.Date;
	}
	
	public int getWeekOfYear() {
		return this.Date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
	}
	
	public Month getMonth() {
		return this.Date.getMonth();
	}

}
