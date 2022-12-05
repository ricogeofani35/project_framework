const TodoItem = ({todo, removeTodo, setRefresh}) => {

    const updatetodo = () => {
        // ! artinya logika not (akan merubah menjadi true jika false dan sebaliknya akan merubah menjadi false jika true)
        todo.done = !todo.done;
   
        fetch(`http://localhost:8000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(() => {
                setTimeout(() => {
                    alert('todo updated');
                }, 500);
                setRefresh(true);
            })
            .catch(err => {
                console.log('error:',err);
            })
    }
  
    return (
        <li className={`${todo.done ? 'checked': ''} list-item`}>
            <div onClick={updatetodo}>{todo.title}</div>
            <span className="close">
                <span onClick={() => {removeTodo(todo.id)}}>x</span>
            </span>
        </li>
    )
}

export default TodoItem;