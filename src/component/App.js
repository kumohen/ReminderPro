import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addReminder,deleteReminder,clearReminder} from '../actions';
import {bindActionCreators} from "redux";
import moment from 'moment';

class App extends Component {
  state={
    text:'',
    dueDate:''
  }
  addReminder(){
    this.props.addReminder(this.state.text,this.state.dueDate);
  }
  deleteReminder(id){
    console.log(id);
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const {reminders} = this.props;
    return(
      <ul className="list-group col-md-4">
        {
          reminders.map(reminder =>{
            return(
              <li className="list-group-item" key={reminder.id}>
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div>{moment(new Date(reminder.dueDate)).fromNow()}</div>
                </div>
                <div 
                onClick={()=> this.deleteReminder(reminder.id)}
                className="list-item delete-button"> &#x2715; </div>
              </li>  
            )
          })
        }
      </ul>  
    )
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
          <div className="title">
         <h4> ReminderPro</h4>
          </div>
          <div className="form-inline reminder-form">
            <div className="form-group">
              <input 
              onChange={event => this.setState({text:event.target.value})}
              className="form-control" placeholder="i have to do"/>
              <input 
              onChange={event => this.setState({dueDate:event.target.value})}
              className="form-control" type="datetime-local"/>
            </div>
              
            <button onClick={() => this.addReminder()} 
            type="button" className="btn btn-primary">Add Reminder</button>
            {this.renderReminders()}
            <div className="btn btn-danger" onClick={this.props.clearReminder}>
              clear Reminder
            </div>  
          </div>

      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    reminders:state
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder,deleteReminder,clearReminder},dispatch);  
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
