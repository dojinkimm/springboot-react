package org.henry.programmers.todolist.controller;


import org.henry.programmers.todolist.model.ToDo;
import org.henry.programmers.todolist.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    // 새로운 Todo를 더하는 함수이다. post 이기 때문에 request body에 내용이 전달 된다
    @PostMapping("")
    public ResponseEntity<?> addToDo(@Valid @RequestBody ToDo toDo, BindingResult result){
        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
        }

        ToDo newPT = toDoService.saveOrUpdateToDo(toDo);
        return new ResponseEntity<ToDo>(newPT, HttpStatus.CREATED);
    }

    //모든 todo를 반환하는 리스트이다
    @GetMapping("/getall")
    public List<ToDo> getAllToDos(){
        return toDoService.findAll();
    }

    //id로 특정 todo를 찾는 함수이다
    @GetMapping("/{id}")
    public ResponseEntity<?> getToDoById(@PathVariable Long id){
        ToDo projectTask = toDoService.findById(id);
        return new ResponseEntity<ToDo>(projectTask, HttpStatus.OK);
    }

    //해당 아이디를 전달하면 삭제를 시킨ㄴ다
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id){
        toDoService.delete(id);
        return new ResponseEntity<String>("ToDo Deleted", HttpStatus.OK);
    }

}
