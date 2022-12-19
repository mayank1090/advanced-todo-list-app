import React, {  useEffect, useState } from 'react';
import './App.css';
function Task({ task, index, completeTask, removeTask}) {
            return (
                <>
                
                <div
                    className="task"
                    style={{ textDecoration: task.completed ? "line-through" : "" }}
                >
                    {task.title}
        
                    <button id='remove' onClick={() => removeTask(index)}>x</button>
                    <button id='complete' onClick={() => completeTask(index)}>complete</button>
        
                </div>
                </>
            );
        
        
        }


function CreateTask({ tasks,setTasks}) {
    const [value, setValue] = useState("");
    const [status,setstutus]=useState("all")
    const [filterdata,setfilterdata]=useState([])
   

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    useEffect(()=>{
        handlefilter();
    },[tasks,status])

    const handlefilter=()=>{
        switch(status){
            case "completed" :
                setfilterdata(tasks.filter((task)=>task.completed===true));
                break;

             case "incomplete":
                setfilterdata(tasks.filter((task)=>task.completed===false));
                break;
             
                default:
                    setfilterdata(tasks)
        }
    }

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];

        if(newTasks[index].completed === false){
             
            newTasks[index].completed = true}

            else{
                newTasks[index].completed = false
            }

        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    
    



    return (
        <>
        <form onSubmit={handleSubmit}>
            <span>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add Your Todo"
                onChange={e => setValue(e.target.value)}
            />
            </span>
            <span>
            <button id="postbutton"type='onsubmit'>post</button>
            </span>
        </form>
        <span>
        <select id='selection' onChange={(e)=>{
                setstutus(e.target.value)
            }}>
                <option>all</option>
                <option>completed</option>
                <option>incomplete</option>
            </select>
            </span>
            <div className="tasks">
                {filterdata.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div>

        
        </>
    );
}



function App() {

    
    const [tasks, setTasks] = useState([]);

    return (
        <>
        <h1 >Cerbosys Todo list</h1>
        <div className="todo-container">
        <div className="create-task" >
                <CreateTask tasks={tasks} setTasks={setTasks}/>
            </div>
        </div>
        </>
    );
}

export default App;