import TodoItem from './TodoItem';
import ActionTodo from './ActionTodo';
import { useState, useEffect, Fragment } from 'react';

const TodoList = ({isRefresh, setRefresh}) => {
    // membuat state dengan teknik hook
    const [todos, setTodos] = useState([]);

    const getDataTodo = () => {
        fetch("http://localhost:8000/todos")
        .then(res =>  {
            return res.json()
        }) //berubah menjadi promise
        .then(json => {
            setRefresh(false);
            setTodos(json);
        })
        .catch(err => {
            setRefresh(false);
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        })
    }
    useEffect(() => {
        if(isRefresh) {
            getDataTodo();
        }
    }, [isRefresh]);

    const removeTodo = (id) => {
        fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setRefresh(true);
            setTimeout(() => {
                alert('delete success');
            }, 500);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <Fragment>
            <ul id='todo-list'>
                {
                    todos.map(todo => (
                        <TodoItem todo={todo} key={todo.id} removeTodo={removeTodo} setRefresh={setRefresh} />
                    ))
                }
            </ul>
            <ActionTodo todos={todos} setRefresh={setRefresh} />
        </Fragment>
    )
}

export default TodoList;