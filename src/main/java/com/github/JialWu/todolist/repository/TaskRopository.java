package com.github.JialWu.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.JialWu.todolist.model.Task;
@Repository
public interface TaskRopository extends JpaRepository<Task,Integer>{

}
