import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion as m } from "framer-motion"

export default function DeleteBlog({deleteBlogData = {}, updateCallback, closedModal}) {
    console.log(deleteBlogData.blog_id)
    console.log(deleteBlogData.blog_title)

    const deleteBlog = async (e) => {
        console.log(deleteBlogData.blog_id)
        try {
            const options = {
                method: "DELETE"
            }
            const url = "/api/" + `delete_blogs/${deleteBlogData.blog_id}`
            const response = await fetch(url, options)
            if (response.status == 201 || response.status == 200) {
                const data = await response.json()
                updateCallback()
                toast(data.message)       
            }
            else {
                const data = await response.json()
                alert(data.message)
            } 
    
        } catch (error) {
            alert(error)
        }
    
    }

    const closeModal = () => {
        closedModal();
    }


    return (
        <div className="delete-blog-section">
            <div>
                <p>Are you sure you want to remove this post?</p>
                <p>"{deleteBlogData.blog_title}"</p>
            </div>
            <div>
                <m.button type="submit" onClick={() => deleteBlog()}
                            whileTap={{scale:0.9}} 
                            whileHover={{scale:1.01}}
                            transition={{bounceDamping:100, bounceStiffness: 1000}}>
                                Remove
                </m.button>
                <m.button type="submit" onClick={() => closeModal()}
                        whileTap={{scale:0.9}} 
                        whileHover={{scale:1.01}}
                        transition={{bounceDamping:100, bounceStiffness: 1000}}>
                            Cancel
                </m.button>
            </div>  
        </div>
    )
}

