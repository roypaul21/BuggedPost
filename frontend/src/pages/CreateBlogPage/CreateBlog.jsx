import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { motion as m } from "framer-motion"
import {Link} from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function CreateBlog(){
    const [blog_title, setBlogTitle] = useState("");
    const [blog_content, setBlogContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            blog_title,
            blog_content
        }

        const url = "/api/create_blogs"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        console.log(response)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            const data = await response.json()
            toast(data.message)
            modalOpened()

        }
    }

    const modalOpened = () => {
        if (!isModalOpen) setIsModalOpen(true)
    }

    const modalClosed = () => {
        setIsModalOpen(false)
    }

    AOS.init({
        offset: 200,
        duration: 300,
        easing: 'ease-in-sine',
        delay: 100,
        debounceDelay: 50,
        throttleDelay: 99,
        once: false, 
        mirror: true
    });
 

    return(
        <section className="create-blog-section">
            <ToastContainer />
            {isModalOpen && <section className="return-home-modal">
                <div className="modal-content" data-aos="zoom-out">
                    <div>
                        <h1>POST CREATED SUCCESSFULLY</h1>
                    </div>
                    <div>
                        <Link to="/home-admin">
                            <button>Return Home</button>
                        </Link>
                        <button onClick={modalClosed} >Cancel</button>
                    </div>
                </div>
            </section>
            }
            <m.div className="create-blog-container"  initial={{y:"100%"}} animate={{y:"0%"}} transition={{duration: 0.5, ease: "easeOut"}} exit={{opacity:1}}>
                <div>
                    <m.h1 animate={{y:0}} initial={{y:"100%"}} transition={{delay: 0.3, duration: 0.3}}>
                        CREATE POST
                    </m.h1>
                </div>
                <form className="create-blog-content" onSubmit={onSubmit}>
                    <div>
                        <div>
                            <label htmlFor="blog_title">Title</label>
                            <input type="text" id="blog_title" 
                                   value={blog_title} 
                                   onChange={(e) => setBlogTitle(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="blog_content">Post Content</label>
                            <textarea id="blog_content" type="text"
                                      value={blog_content} 
                                      onChange={(e) => setBlogContent(e.target.value)}
                                      required
                                      />
                        </div>
                    </div>
                    <div>
                        <m.button type="submit"
                        whileTap={{scale:0.9}} 
                        whileHover={{scale:1.01}}
                        transition={{bounceDamping:100, bounceStiffness: 1000}}>
                            Create Post
                        </m.button>
                    </div>
                </form>
            </m.div>
        </section>
    )
}