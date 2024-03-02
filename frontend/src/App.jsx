import React, {useState, useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import {Suspense} from 'react';
import './App.css'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClockLoader";
import {AnimatePresence} from "framer-motion"

function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
       setLoading(false)
    }, 1500)
  }, [])

  return (
    <>
        {
        loading ?
        <div className='loader--section'>
          <ClipLoader size={250} color={"black"} loading = {loading} speedMultiplier={2}/>
        </div>
        :
        <>
        <AnimatePresence initial={true} mode={"wait"}>
          <Suspense fallback={<section style={{backgroundColor:"white", width:"100%", height:"100vh", display:"flex", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
            <h1>Starting....</h1>
            </section>}>
              <RouterProvider router={router} />
          </Suspense>
        </AnimatePresence>
        </>  
      }
    </>
  )
}

export default App
