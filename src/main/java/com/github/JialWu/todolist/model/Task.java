package com.github.JialWu.todolist.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.Instant;
import java.time.LocalDate;

@Entity
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private boolean status;
	private Instant timeAdded;
	private LocalDate dueTime;
	private int priority;

	public Task() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Instant getTimeAdded() {
		return timeAdded;
	}

	public void setTimeAdded(Instant timeAdded) {
		this.timeAdded = timeAdded;
	}

	public LocalDate getDueTime() {
		return dueTime;
	}

	public void setDueTime(LocalDate dueTime) {
		this.dueTime = dueTime;
	}

	public int getPriority() { return priority; }

	public void setPriority(int priority) { this.priority = priority; }
}
