package org.henry.programmers.todolist.repository;

import org.henry.programmers.todolist.model.ToDo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends CrudRepository<ToDo, Long> {
    ToDo getById(Long id);
}
