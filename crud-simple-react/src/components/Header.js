import { useState } from "react";

const Header = ({setRefresh}) => {
    const [title, setTitle] = useState('');

    const addTodo = () => {
        const newTodo = {title, done: false};

        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then(() => {
            setTitle('');
            setRefresh(true);
            setTimeout(() => {
                alert('New Todo Added..');
            }, 500);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return (
        <div id="todo-header" className="header">
            <h2 className="title">Simple ToDo App</h2>
            <input type='text' className='input-text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="btn-add" onClick={addTodo}>Add</button>
        </div>
    )
}

export default Header;