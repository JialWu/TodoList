package todoList.tasks;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Task {
	private String name;
	private boolean status = false;
	private LocalDateTime timeAdded;
	private LocalDateTime timeDone;
	private LocalDateTime deadline;
	
	public Task(String name, LocalDateTime timeAdded) {
		this.name = name;
        this.timeAdded = timeAdded;
	}

	// set a new name
	public void setName(String newName) {
		this.name = newName;
	}
	// get the name of a task
	public String getName() {
		return this.name;
	}
	
	// get the Date when the task is added
	public LocalDateTime getAddedTime() {
		return this.timeAdded;
	}
	
	// set the time when the task is done
	public void setDoneTime(LocalDateTime timeDone) {
		this.timeDone = timeDone;
	}
	// get the time when the task is done
	public LocalDateTime getDoneTime() {
		return this.timeDone;
	}
	
	// set deadline of the task
	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}
	// check the task whether before a specific day
	public boolean deadlineIsBetween(LocalDate dataStart, LocalDate dateEnd) {//throws NullPointerException {
		boolean deadlineIsBetween;
		
	    if (this.deadline == null) {
	        //throw new NullPointerException("Deadline is not set");
	    	deadlineIsBetween = false;
	    }
	    else {
	    	LocalDate deadlineDate = this.deadline.toLocalDate();
	    	deadlineIsBetween = (!deadlineDate.isBefore(dataStart) && !deadlineDate.isAfter(dateEnd));
	    }
		return deadlineIsBetween;
	}
	// check the task whether after a specific day
	public boolean deadlineIsAfter(LocalDate localDate) {//throws NullPointerException {
		boolean deadlineIsAfter;
	    if (this.deadline == null) {
	        //throw new NullPointerException("Deadline is not set");
	    	deadlineIsAfter = false;
	    }
	    else {
	    	deadlineIsAfter = (this.deadline.toLocalDate().compareTo(localDate) >= 0);
	    }
		return deadlineIsAfter;
	}
	
	// set the task's status
	public void setStatus(boolean status) {
		this.status = status;
	}
	// get the task's status
	public boolean getStatus() {
		return this.status;
	}
	
	public String toString() {
		return this.name + " " + this.status + " " + this.timeAdded + " " + this.deadline + " " + this.timeDone;
	}
}