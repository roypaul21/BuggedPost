import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

export default function UpdateBlog({updateBlogData = {}, updateCallback}) {
    
    console.log(updateBlogData.blog_id)
    console.log(updateBlogData.blog_title)
    console.log(updateBlogData.blog_content)

    const [blog_title, setBlogTitle] = useState(updateBlogData.blog_title);
    const [blog_content, setBlogContent] = useState(updateBlogData.blog_content);


    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            blog_title,
            blog_content
        }

        const url = "/api/" + `update_blogs/${updateBlogData.blog_id}`
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            const data = await response.json()
            toast(data.message)
            updateCallback()
        }
    }
    return(   
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
                <motion.button type="submit"
                        whileTap={{scale:0.9}} 
                        whileHover={{scale:1.01}}
                        transition={{bounceDamping:100, bounceStiffness: 1000}}>
                            Update Post
                </motion.button>
                </div>
        </form>        
    )
}