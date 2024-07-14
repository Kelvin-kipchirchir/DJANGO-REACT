//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import CustomModal from './components/Modal'
import axios from 'axios';
 

//since we are using class component we 
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false,//else will be 
      viewCompleted:false,
       activeItem:{
         title:"",
         description:"",
         completed:false
      },
      //taskList : task,
      todoList : []
    };
  }

  //create a componentdid mount
  componentDidMount(){
    this.refreshList();
  }

  refreshList = () =>{
    axios
    .get("http://127.0.0.1:8000/api/tasks/")
    .then(res =>this.setState({todoList: res.data }))
    .catch(err => console.log(err))
  };


  //create toggle property
  toggle = () =>{
    this.setState({modal: !this.state.modal});
  };

  //submit
  handleSubmit = item =>{
    this.toggle();
    if(item.id){
      axios
      .put("http://localhost:8000/api/tasks/${item.id}/", item)
      .then(res => this.refreshList())
    }
    axios
    .post("http://localhost:8000/api/tasks/",item)
    .then(res => this.refreshList())
    //alert('Deleted!!!' + JSON.stringify(item))
  };

  //delete
  handleDelete = item =>{
    //this.toggle();
    axios
    .delete("http://localhost:8000/api/tasks/${item.id}/")
    .then(res => this.refreshList())

    //alert('saved!!!' + JSON.stringify(item))
  }

  createItem = () =>{
    const item = {title: "",modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal});
  };

  editItem = item =>{
    this.setState({ activeItem: item, modal: !this.state.modal});
  };

  //property 1
  displayCompleted = status =>{
    if (status) {
      return this.setState({ viewCompleted:true });
    }else{
      return this.setState({viewCompleted:false});
    }
  }





 //property2 ->will render our tablist to the screen 
renderTabList = () =>{
  return (
     <div className="my-5 tab-list">
 <span 
 onClick={() =>this.displayCompleted(true)}
  className={this.state.viewCompleted ? "active" : ""}
   >Completed
      </span>

      <span 
 onClick={() =>this.displayCompleted(false)}
  className={this.state.viewCompleted ? "" : "active"}
   >Incompleted
      </span>

    </div>
     

  )
}


// //property3 render items in the list completed on incompleted
renderItems = () =>{
  const { viewCompleted } = this.state;
  //const newItems = this.state.taskList.filter(
  const newItems = this.state.todoList.filter(
    item => item.completed == viewCompleted
    );


    return newItems.map(item => (
    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={'todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}'} 
        title={item.title}>
        {item.title}
           </span>
       
         <span>
            <button className="btn btn-info mr-2 ">Edit</button>
            <button className="btn btn-danger mr-2">Delete</button>
         </span>
     </li>
    ))

 };


 render(){
   return(
    <main className="content p-3 mb-2 bg-info">
      <h1 className="text-white text-uppercase text-center my-4">Task Manager </h1>
         <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className = "card p-3">
              <div>
                <button className="btn btn-primary">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
         </div>
 <footer className="my-5 mb-2 bg-info text-white text-center">Copyright &2024, All Rights Reserved</footer>
 {this.state.modal ? (
  <modal activeItem={this.state.activeItem} toggle={this.toggle} 
  onSave={this.handleSubmit}/>
  ):null}
    </main>
    );
} 





 }

export default App;

 