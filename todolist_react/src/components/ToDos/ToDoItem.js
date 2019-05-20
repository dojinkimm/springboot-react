import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteToDo } from "../../actions/ToDoActions";

//각각 카드의 내용을 담은 클래스이다
class ToDoItem extends Component {
  onDeleteClick(id) {
    this.props.deleteToDo(id);
  }

  render() {
    const { todo } = this.props; //parent component에서 가지고 왔다
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          {
            //priority 3이면 상, 2이면 중, 1이면 하를 표시하고 색상은 상 빨강, 중 노랑, 하 초록으로 표시한다
          }
          <div
            className={
              todo.priority === 3
                ? "col-md-1 bg-danger"
                : todo.priority === 2
                ? "col-md-1 bg-warning"
                : "col-md-1 bg-success"
            }
          >
            <p className="text-center text-white font-weight-bold">
              {todo.priority === 3 ? "상" : todo.priority === 2 ? "중" : "하"}
            </p>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text text-muted">{todo.content}</p>
              <Link to={`updateToDo/${todo.id}`} className="card-link">
                수정
              </Link>

              {
                //삭제버튼을 누르면 해당 아이템의 아이디를 알려주고 아이디로 삭제를 한다
              }
              <button
                style ={{marginLeft:"20px"}}
                className="btn btn-outline-danger"
                onClick={this.onDeleteClick.bind(this, todo.id)}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="card-header col">
            {" "}
            <p className="card-text  text-center">
              <small className="text-muted">
                마감기한
                <br />
                {todo.duedate === null ? "no due date" : todo.duedate}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
ToDoItem.propTypes = {
  deleteToDo: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteToDo }
)(ToDoItem);
