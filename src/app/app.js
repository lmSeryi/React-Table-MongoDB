import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

export const App = () => {

    const controller = new AbortController()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tasks, setTasks] = useState([])

    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }

    const handleDescription = (event) =>{
        setDescription(event.target.value)
    }

    const addTask = async (ev) => {
        console.log(title.indexOf(' '))
        ev.preventDefault()
        await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, setTimeout(() => {
            controller.abort.bind(controller)
            M.toast({html:'error while saving to add the task'})
        }, 2000))
        .then(() =>{
            setTitle('')
            setDescription('')
            M.toast({html:'Task saved'}) 
            fetchTask()
        })
        
    }

    const removeTask = async (id) =>{
        if (confirm('Are you sure you want to remove it?')){
            await fetch(`/Hi/${id}`, {
                method: 'delete',
                body: JSON.stringify({id}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, setTimeout(() => {
                controller.abort.bind(controller)
                M.toast({html:'Error while trying to remove the task'})
            }, 2000))
            .then(()=>{
                M.toast({html:'Task removed'}) 
                fetchTask() 
            })
        }
}

    const editTask = async (id) =>{
        if(title.length < 1 || description.length < 1){
            M.toast({html:'Please type the task and its description'}) 
        }
        else{
            await fetch(`/Hi/${id}`, {
                method: 'put',
                body: JSON.stringify(
                        {
                            title,
                            description
                        }
                    ),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, setTimeout(() => {
                controller.abort.bind(controller)
                M.toast({html:'Error while trying to edit the task'})
            }, 2000))
            .then(()=>{
                M.toast({html:'Task edited'}) 
                fetchTask() 
            })
                        
        }
    }

    const fetchTask = async () =>{
        const apiCall = await fetch('/Hi/')
        const setTask = await apiCall.json()
        setTasks(setTask)
    }

    useEffect(()=>{
        fetchTask()
    },[tasks.title])

    return(
        
        <div>
            {/* NAVIGATION */}
            <nav className='light-blue darken-4'>               
                <div className='container'>
                    <a href="/" className='brand-logo'>Mern Stack</a>
                </div>
            </nav>

            {/*Container*/}
            <div className="container">
                <div className="row">
                    <div className="col s5 card">
                        <form onSubmit={addTask} className="card-content">
                            <div className="row">
                                <input 
                                    value = {title} 
                                    onChange={handleTitle} 
                                    type='text' 
                                    className="input-field cik s12" 
                                    name='title' 
                                    placeholder='Title' 
                                />
                            </div>
                            <div className="row">
                                <textarea 
                                    value={description} 
                                    onChange={handleDescription} 
                                    placeholder='Description'
                                    className='materialize-textarea' 
                                    name="description"
                                />
                            </div>
                            <button type='submit' className='btn light-blue darken-4'>Send</button>
                        </form>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>                                                
                                                <td>
                                                    <button className='btn light-blue darken-4'>
                                                        <i  className="material-icons" 
                                                            onClick = {() => removeTask(task._id)}>
                                                                remove
                                                        </i>
                                                    </button>
                                                    <button style={{margin:'4px'}} onClick = {() => editTask(task._id)} className='btn light-blue darken-4'>
                                                        <i className="material-icons">
                                                            edit
                                                        </i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

render(<App/>, document.getElementById('app')) 