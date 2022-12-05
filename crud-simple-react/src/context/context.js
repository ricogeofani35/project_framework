// import { Children, useState } from "react";

// export const RootContext = createContext();
// const Provider = RootContext.Provider;

// const GlobalProvider = (children) => {
//     const ParentComp = () => {
//         const [todos, setTodos] = useState([]);

//         dispatch = (action) => {
//             if(action.type === 'getTodo') {
//                 const getDataTodo = () => {
//                     fetch("http://localhost:8000/todos")
//                     .then(res =>  {
//                         return res.json()
//                     }) //berubah menjadi promise
//                     .then(json => {
//                         // setRefresh(false);
//                         setTodos(json);
//                     })
//                     .catch(err => {
//                         // setRefresh(false);
//                         if (err.name === "AbortError") {
//                             console.log("fetch aborted.");
//                         }
//                     })
//                 }
//             }
//         }

//         return (
//             <Provider value={
//                 {
//                     todos,
//                     dispatch : this.dispatch
//                 }
//             }>

//                 <Children {...this.props} />
//             </Provider>
//         )
//     }
    
// }