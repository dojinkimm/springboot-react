import axios from 'axios'
import {ERRORS, GET_TODO_LIST,DELETE_TODO,GET_TODO_ITEM} from "./types";


export const addToDo = (todo, history) => async dispatch =>{
    try{
        await axios.post("/api/todo", todo);
        history.push("/"); 
        dispatch({ //잘 추가 됬으면 이젠에 에러가 있는 부분 없어져야 한다
            type: ERRORS,
            payload: {}
        });
    }catch (error){ //오류가 생기면 에러를 보여준다
        dispatch({
            type: ERRORS,
            payload: error.response.data
        });
    }
};

export const getBacklog= () => async dispatch =>{ //모든 todo 리스트를 가지고 온다
    const res = await axios.get("/api/todo/getall");
    dispatch({
        type: GET_TODO_LIST,
        payload:res.data
    });
};

export const deleteToDo = id => async dispatch =>{ //현재 누른 todo를 삭제한다
    if(window.confirm(`확인을 누르면 삭제됩니다. 삭제하시겠습니까?`)){ //삭제를 하기 전에 알림창으로 물어본다, 확인을 누르면 삭제한다
        await axios.delete(`/api/todo/${id}`);
        dispatch({
            type: DELETE_TODO,
            payload: id
        });
    }
};


export const getToDoItem = (id, history) => async dispatch =>{ //수정을 할 때 해장 todo의 내용 가지고 오기 위함이다
    try{
        const res = await axios.get(`/api/todo/${id}`);
        dispatch({
            type: GET_TODO_ITEM,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
};
