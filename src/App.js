import React, {useEffect} from 'react'
import TodoList from "./components/Todo/TodoList";
import TodoContext from "./contexts/TodoContext";
import Loader from "./components/common/Loader";
import Modal from "./components/Modal/Modal";

const TodoAdd = React.lazy(() =>
        import('./components/Todo/TodoAdd')
   // new Promise(resolve => {
  //      setTimeout(() => {
   //         resolve(import('./components/Todo/TodoAdd'))
    //    }, 3000)
    //})
)

function App() {
    const [todos, setTodos] = React.useState([])
    const [loading, setloading] = React.useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTodos(todos)
                setloading(false)
            })
    }, [])


    function toggleTodo(id) {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
        <TodoContext.Provider value={{removeTodo}}>
            <div className='wrapper'>
                <h1>React sample</h1>

                <Modal/>
                <React.Suspense fallback={<Loader />}>
                    <TodoAdd onCreate={addTodo}/>
                </React.Suspense>

                {loading && <Loader/>}
                {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> : loading ? null : <p>No tasks...</p>}

            </div>
        </TodoContext.Provider>
    )
}

export default App;
