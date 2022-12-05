
const ActionTodo = ({todos, setRefresh}) => {
    
    const doneAllTodo = () => {
        
        localStorage.setItem('dataTodo', todos);

        const t = localStorage.getItem('dataTodo');
        const todo = JSON.parse(t);
        console.log(todo);

        // todo.done = !todo.done;

        // fetch(`http://localhost:8000/todos/${todo.id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(todo)
        // })
        // .then(() => {
        //     console.log('updated all suceess');
        //     setRefresh(true);
        //     return false;
        // })
        // .catch(err => {
        //     console.log('error:', err);
        // })   

    }

    return (
        <div className="action-todo">
            <p onClick={doneAllTodo}>done all</p>
            <p className="remove">remove all</p>
        </div>
    )
}

export default ActionTodo;