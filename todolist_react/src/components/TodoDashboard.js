import React, { Component } from "react";
import { Link } from "react-router-dom";
import ToDoItem from "./ToDos/ToDoItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/ToDoActions";
import dateFormat from "dateformat";

class TodoDashboard extends Component {
  componentDidMount() {
    //전체 리스트를 가지고 온다
    this.props.getBacklog();
  }

  render() {
    const { todo_list } = this.props.todo_list;

    let dashBoard;
    let todoItems = []; //todo 인 아이템 개수
    let completeItems = []; //complete인 아이템 개수
    let overTimeItems = []; //마감기한 지난 아이템 개수

    const dashboardCalculate = todo_list => {
      const tasks = todo_list.map(todo => (
        <ToDoItem key={todo.id} todo={todo} />
      ));
      let date = dateFormat(new Date(), "yyyy.mm.dd").toString(); //현재 날짜를 파싱해서 마김기한이 지났는지 비교한다
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].props.todo.completed === "TODO") {
          //props에 내 일이 todo 형태인지 확인
          todoItems.push(tasks[i]);
          if ( tasks[i].props.todo.duedate < date && tasks[i].props.todo.duedate !== null) { //현재진행중으로 분류된 아이템 중에 마감기한 지난 걸 찾는다
            overTimeItems.push(tasks[i]);
          }
        } else if (tasks[i].props.todo.completed === "COMPLETED") {
          //props에 내 일이 completed 형태인지 확인
          completeItems.push(tasks[i]);
        }
      }

      //카드 형식 나오는 부분을 보여주는 코드이다
      return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="card text-center">
                  <div className="bg-light" style={{ padding: "20px" }}>
                    <h3>TO DO</h3>
                  </div>
                </div>
                {
                  // 파란색으로 todo 아이템을 추가하는 부분
                }
                <Link to="/addToDo">
                  <button
                    className="col-12 btn btn-primary"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <i
                      className="fas fa-plus"
                      style={{ marginRight: "15px" }}
                    />
                    To Do 추가하기
                  </button>
                </Link>
                {
                  // 진행중인 todo 보여주는 리스트
                }
                {todoItems}
              </div>
              <div className="col-6">
                <div className="card text-center">
                  <div
                    className="bg-dark text-white"
                    style={{ padding: "20px" }}
                  >
                    <h3>COMPLETED</h3>
                  </div>
                </div>
                {
                  // 완료된 todo 보여주는 리스트
                }
                {completeItems}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    };
    dashBoard = dashboardCalculate(todo_list);

    //만약 todo인데 마감기한이 지났으면 warning 화면을 보여준다
    let displayWarning;
    const countOverTimeItems = overTimeItems => {
      if (overTimeItems.length > 0) {
        let overStrings = "";
        for (let i = 0; i < overTimeItems.length; i++) {
          if(i!==overTimeItems.length-1){
            overStrings += overTimeItems[i].props.todo.title+", ";
          }else{
            overStrings += overTimeItems[i].props.todo.title;
          }
        }
        return (
          <React.Fragment>
            <div className="alert alert-danger">
              <strong>>{overStrings} <br/>해당 제목을 가진 TODO가 마감기한을 넘었습니다</strong>
            </div>
          </React.Fragment>
        );
      }
    };
    displayWarning = countOverTimeItems(overTimeItems);

    return (
      <div className="container" style={{ padding: "20px" }}>
        {displayWarning}
        <br />

        {dashBoard}
      </div>
    );
  }
}

TodoDashboard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  todo_list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todo_list: state.todo
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(TodoDashboard);
