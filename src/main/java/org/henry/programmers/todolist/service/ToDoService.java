package org.henry.programmers.todolist.service;

import org.henry.programmers.todolist.model.ToDo;
import org.henry.programmers.todolist.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {


    // repository와 controller의 미들맨 역할
    @Autowired
    private ToDoRepository toDoRepository;

    // 아이템을 저장 혹은 업데이트할 때 사용된다
    public ToDo saveOrUpdateToDo(ToDo toDo){
        // 완료됨을 표시하지 않으면 해야할일임을 지정한다
        if(toDo.getCompleted()==null || toDo.getCompleted()==""){
            toDo.setCompleted("TODO"); //if user doesnt select status just
        }

        //priority는 1~3 단계로 지정하고, 값이 이 구간을 유지하게 한다
        //구간을 넘어서던가 null이면 가장 낮은 우선순위인 1로 지정한다
        if(toDo.getPriority()>3 || toDo.getPriority()<1 || toDo.getPriority()==null){
            toDo.setPriority(1);
        }

        return toDoRepository.save(toDo);
    }

    public List<ToDo> findAll(){
        return (List<ToDo>)toDoRepository.findAll();
    }

    public ToDo findById(Long id){
        return toDoRepository.getById(id);
    }


    public void delete(Long id){
        ToDo toDo = findById(id);
        toDoRepository.delete(toDo);
    }

}
