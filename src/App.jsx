import Card from "./components/UI/Card";
import Form from "./components/Form";
import { useState, useEffect, } from "react";
import db from "./utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './App.css'

const App = () => {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState([]);


  const fetchData = async () => {
    const fetchedData = await getDocs(collection(db, "todo"));
    const result = []
    fetchedData.forEach((doc) => {
      result.push({
        title: doc.data().title,
        image: doc.data().image,
        id: doc.id,
        timestamp: doc.data().timestamp
      })
    });

    result.sort((a, b) => {
      return a.timestamp - b.timestamp
    })
    setData(result)
  };

  const addData = async (title, image) => {
    try { 
      await addDoc(collection(db, "todo"), {
        title: title,
        image: image,
        timestamp: new Date()
      });
    } catch (err) {
      console.log(err);
    }

    fetchData();
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "todo", id))
    fetchData()
  }

  useEffect(() => {
    fetchData();
  }, []);

  const sendValueHandler = (title, image) => {
    addData(title, image);
  };

  const updateData = async (title, image, timestamp, id) => {
    await setDoc(doc(db, "todo", id), {
      title: title,
      image: image,
      timestamp: timestamp
    })

    fetchData()
  }

  const onClickCardHandler = (title, image, timestamp, id) => {

    MySwal.fire({
      html: <div className="">
              <label htmlFor="title" className="inline-block relative right-[5.7rem]">Title:</label>
              <input id="title" type='text' placeholder={title} className="my-2 block m-auto px-3 py-1 border-2 border-black rounded-xl" />
              <label htmlFor="image" className="inline-block relative right-16">Image URL:</label>
              <input id="image" type='text' placeholder={image} className="my-2 block m-auto px-3 py-1 border-2 border-black rounded-xl" />
            </div>,
    
      icon: 'info',
      confirmButtonText: 'Save',
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: 'Delete',
      focusConfirm: false,
      preConfirm: () => {
        const changedTitle = document.getElementById('title').value
        const changedImage = document.getElementById('image').value
        
        if((changedTitle === "") && (changedImage !== image)) {
          MySwal.fire({
            icon: 'success',
            title: <p className="font-poppins font-normal">Success</p>
          })

          updateData(title, changedImage, timestamp, id)
        } else if((changedTitle !== title) && (changedImage === "")) {
          MySwal.fire({
            icon: 'success',
            title: <p className="font-poppins font-normal">Success</p>
          })

          updateData(changedTitle, image, timestamp, id)
        } else if((changedTitle !== title) && (changedImage !== image)) {
          MySwal.fire({
            icon: 'success',
            title: <p className="font-poppins font-normal">Success</p>
          })
    
          updateData(changedTitle, changedImage, timestamp, id)  
        }
      }
    }).then(result => {
      if(result.isDenied) {
        deleteData(id)
      }
    })
  }

  return (
    <div className="App min-h-screen bg-amber-200 flex flex-col relative justify-center items-center">
      <div className="absolute top-10 text-5xl font-bold ">Store CRUD</div>
      <div>
        <Form onSendValue={sendValueHandler} />
      </div>
      <div className="mt-10 mx-10">
        {data.length === 0 ? (
          <h1 className="font-poppins text-2xl">Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-5 grid-flow-row justify-items-center content-center gap-x-5 gap-y-5">
            <AnimatePresence>
              {data.map((item) => {
                return (
                  <motion.div 
                  key={item.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  >
                    <Card
                      title={item.title}
                      image={item.image}
                      id={item.id}
                      timestamp={item.timestamp}
                      onRemoveItem={deleteData}
                      onClickCard={onClickCardHandler}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
