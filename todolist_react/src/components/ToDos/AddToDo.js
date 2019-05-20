import React, { Component } from "react";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import PropTypes  from "prop-types"
import {connect} from "react-redux";
import {addToDo} from "../../actions/ToDoActions";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

class AddToDo extends Component {
  constructor() {
    //처음에 초기화하는 것이기 때문에 모든 값들이 "" 형태이다
    super();
    this.state = {
      title: "",
      content: "",
      priority: "1",
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

  onSubmit(e){
      e.preventDefault(); //default였던 값들 들어가지 않도록 한다
      var d = dateFormat(this.state.duedate, "yyyy.mm.dd").toString(); //string으로 변환후에 넣어준다
      const newToDo = {
        title: this.state.title,
        content: this.state.content,
        priority: this.state.priority,
        completed: this.state.completed,
        duedate: d
      };
      console.log(this.state.title);
      this.props.addToDo(newToDo,this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="container" style={{ padding: "20px" }}>
          <div>
            <h1 className="text-center">To Do 추가하기</h1> <small className="text-danger">  현재 영어로만 작성이 가능합니다</small>
            <form onSubmit={this.onSubmit}>
              {
                //제목 작성하는 칸
              }
              <div className="form-group">
                <label htmlFor="titleInput">To Do 제목<small className="text-danger">    *필수항목</small></label>
                <input
                  type="text"
                  id="titleInput"
                  className={classnames("form-control", {
                      "is-invalid": errors.title
                  })}
                  name="title"
                  placeholder="Please Enter Title in English"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                {
                    errors.title && ( <div className="invalid-feedback">{errors.title}</div>)
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
                }
                <div className="form-group col">
                  <label htmlFor="duedateInput">마감기한</label>
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

AddToDo.propTypes = {
    addToDo: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addToDo}) (AddToDo);
