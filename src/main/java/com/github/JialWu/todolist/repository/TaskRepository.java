package com.github.JialWu.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.JialWu.todolist.model.Task;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer>{
    @Query("select t from Task t where (t.dueTime < :dueTime and t.status = false) or (t.dueTime = :dueTime)")
    List<Task> findUnfinishedWithDueTimeBefore(LocalDate dueTime);
}
