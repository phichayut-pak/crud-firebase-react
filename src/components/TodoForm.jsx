import db from "../utils/firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, where, query} from 'firebase/firestore'
import { useState, useEffect } from 'react';

const TodoForm = () => {

  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState([])

  const onChangeHandler = (e) => {
    setTitle(e.target.value)
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(title === "") {
      return
    }
    
    createTodo()
    setTitle("")
    
  }
  const getTodo = async () => {
    const querySnapshot = await getDocs(collection(db, "todo"));
    const response = []
    querySnapshot.forEach((doc) => {
      response.push({
        title: doc.data().title,
        id: doc.data().id
      })
    });

    setTodos(response)

  }

  const createTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        title: title,
        id: Math.floor(Math.random() * 10000)
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    getTodo()
  }

  const deleteTodo = async (id) => {
    const todoRef = collection(db, 'todo')
    const q = query(todoRef, where('id', '==', id))
    
    const response = await getDocs(q)
    response.forEach(i => {
      deleteDoc(doc(db, 'todo', i.id))
    })

    getTodo()
    

    
  }
    
  useEffect(() => {
    getTodo()
  }, [])

  
  

  return(
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-300">
      <form className="flex flex-col justify-center items-center" onSubmit={onSubmitHandler} >
        <label htmlFor="title" className="font-['Poppins'] text-3xl">TodoList Firebase</label>
        <input type="text" id="title" onChange={onChangeHandler} value={title}  className="border-md px-5 py-1 mt-10"/>
        <button className="p-1 px-5 py-2 mt-3 rounded-full bg-white transition duration-150 ease-in hover:bg-sky-300 hover:text-white" onClick={onSubmitHandler}>Submit!</button>
      </form>
      <div className="mt-10">
        {todos.map(i => {
          return(<div className="my-2 py-1 px-5 bg-white rounded-xl font-['Poppins'] cursor-pointer" key={i.id} onClick={() => deleteTodo(i.id)}>
            {i.title}
          </div>)
        })}
      </div>  
      
    </div>
  )
}

export default TodoForm