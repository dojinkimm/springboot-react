import React, { Component } from "react";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import PropTypes  from "prop-types"
import {connect} from "react-redux";
import {addToDo, getToDoItem} from "../../actions/ToDoActions";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

class UpdateToDo extends Component {
  constructor() {
    //처음에 초기화하는 것이기 때문에 모든 값들이 "" 형태이다
    super();
    this.state = {
      title: "",
      content: "",
      priority: "",
      completed: "",
      duedate: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(next) {
    //props를 받고 에러가 생기면 errors에 에러 문구를 담아준다
    if(next.errors){
        this.setState({errors:next.errors});
    }
    // duedate는 string 형태인데 datepicker에서 가지고 오는 것은 datetime 형식이다
    // 둘이 호환이 안되기 때문에 여기서 duetime의 내용은 가지고 오지 않는다
    const { id, title, content, priority, completed } = next.todo; 

    this.setState({
      id,title, content, priority, completed});
  }

  //form에서 변화가 일어나면 name에 해당하는 곳은 해당 value를 넣어준다
  handleChange(e) {
    //꼼수긴 하지만 현재 들어온 값이 날짜라면 다른 방식으로 onchange를 적용한다
    if (e.toString().includes("GMT") && e.toString().includes("2019")) {
      this.setState({
        duedate: e
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getToDoItem(id);
  }

  onSubmit(e){
      e.preventDefault(); //default였던 값들 들어가지 않도록 한다
      var d = dateFormat(this.state.duedate, "yyyy.mm.dd").toString();//string으로 변환후에 넣어준다
      const newUpdatedToDo = {
          id: this.state.id,
        title: this.state.title,
        content: this.state.content,
        priority: this.state.priority,
        completed: this.state.completed,
        duedate: d
      };
      this.props.addToDo(newUpdatedToDo,this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="container" style={{ padding: "20px" }}>
          <div className="m-auto">
            <h1 className="text-center">To Do 수정하기</h1> <small className="text-danger">  현재 영어로만 작성이 가능합니다</small>
            <form onSubmit={this.onSubmit}>
              {
                //제목 작성하는 칸
              }
              <div className="form-group">
              <label htmlFor="titleInput">To Do 제목</label>
                <input
                  type="text"
                  id="titleInput"
                  className={classnames("form-control", {
                      "is-invalid": errors.summary
                  })}
                  name="title"
                  placeholder="Please Enter Title in English"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                {
                    errors.summary && ( <div className="invalid-feedback">{errors.summary}</div>)
                }
              </div>
              {
                // 내용 작성하는 칸
              }
              <div className="form-group">
              <label htmlFor="contentInput">To Do 내용</label>
                <textarea
                  id="contentInput"
                  className="form-control"
                  placeholder="Please Enter Content in English"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-row justify-content-between">
                {
                  // 우선순위 정하는 칸
                }
                <div className="form-group col-md-6">
                <label htmlFor="priorityInput">우선순위 (상-중-하)</label>
                  <select
                    id="priorityInput"
                    className="form-control"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChange}
                  >
                  <option value="3">HIGH</option>
                  <option value="2">MEDIUM</option>
                  <option value="1">LOW</option>
                  </select>
                </div>
                {
                  // 상태 정하는 칸
                }
                <div className="form-group col-md-6">
                  <label htmlFor="completedInput">TODO / COMPLETED</label>
                  <select
                    id="completedInput"
                    className="form-control"
                    name="completed"
                    value={this.state.completed}
                    onChange={this.handleChange}
                  >
                    <option value="">Status</option>
                    <option value="TODO">TO DO</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
                {
                  // 마감 기한 정하는 칸
                  // update부분은 기존의 duedate값이 string이기 때문에 datepicker랑 호환이 안된다
                  // 그렇게 때문에 update하러 오면 날짜도 다시 지정해야 하는 아쉬움이 있다.
                }
                <div className="form-group col">
                  <label htmlFor="duedateInput">마감기한</label> <span className="text-danger">(날짜를 다시 선택해주세요)</span>
                  <br />
                  <DatePicker
                    id="duedateInput"
                    name="duedate"
                    selected={this.state.duedate}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <input type="submit" className="btn btn-secondary btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateToDo.propTypes = {
    todo: PropTypes.object.isRequired,
    addToDo: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getToDoItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo.todo,
    errors: state.errors
})

export default connect(mapStateToProps, {getToDoItem, addToDo}) (UpdateToDo);
