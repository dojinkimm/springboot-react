import {GET_TODO_LIST,DELETE_TODO,GET_TODO_ITEM} from "../actions/types";

const initialState = {
    todo_list: [],
    todo: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_TODO_LIST:
        return {
          ...state,
          todo_list: action.payload
        };
      case GET_TODO_ITEM:
        return {
            ...state,
            todo: action.payload
        };
      case DELETE_TODO:
          return {
              ...state,
              todo_list: state.todo_list.filter(
                  todo => todo.id !== action.payload
              )
          };
      default:
        return state
    }
  }
