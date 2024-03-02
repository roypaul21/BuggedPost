import React, {useState, useEffect} from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import UpdateBlog from '../../UpdateBlogModal/UpdateBlog';
import { IoClose } from "react-icons/io5";
import DeleteBlog from '../../DeleteBlogModal/DeleteBlog';
import { ToastContainer, toast } from 'react-toastify';
import { IoSearch } from "react-icons/io5";

import { motion as m } from "framer-motion"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function HomePage(){
    const [blogs, setBlogs] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [isNotBlog, setIsNotBlog] = useState(false);

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedInputValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
        setSearchInput(sanitizedInputValue);
    };

    const preventFormSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    useEffect(() => {
        fetchBlogs()
    }, [searchInput]);

    const fetchBlogs = async () => {
        let url ="/api/blogs"
        if (searchInput) {
            url = url + `/${searchInput}`
        }
        isBlogExist()
        const response = await fetch(url)
        const data = await response.json()
        if (data.blogs.length == 0) { 
            console.log("Blog's Doesnt Exist")
            isBlogNotExist()
        }
        setBlogs(data.blogs)
    } 

    //blogs
    const isBlogNotExist = () => {
        setIsNotBlog(true)
    }

    const isBlogExist = () => {
        setIsNotBlog(false)
    }

    //update blog
    const updateModalClosed = () => {
        setIsUpdateModalOpen(false)
    }

    const updateModal = (blog) => {
        setSelectedBlog(blog)
        updateModalOpened()
    }

    const updateModalOpened = () => {
        if (!isUpdateModalOpen) setIsUpdateModalOpen(true)
    }

    const onUpdate = () => {
        updateModalClosed()
        fetchBlogs()
    }

    //delete blog
    const deleteModalClosed = () => {
        setIsDeleteModalOpen(false)
    }

    const deleteModalOpened = () => {
        if (!isDeleteModalOpen) setIsDeleteModalOpen(true)
    }

    const deleteModal = (blog) => {
        setSelectedBlog(blog)
        deleteModalOpened()
    }

    const onDelete = () => {
        deleteModalClosed()
        fetchBlogs()
    }

    AOS.init({
        offset: 200,
        duration: 300,
        easing: 'ease-out',
        delay: 10,
        debounceDelay: 50,
        throttleDelay: 99,
        once: false, 
        mirror: true
    });

    return(
        <section className="home-section">
            <ToastContainer />
            {isDeleteModalOpen && <section className='delete-modal'>
                <div className='modal-content' data-aos="zoom-out">
                    <DeleteBlog deleteBlogData={selectedBlog} updateCallback={onDelete} closedModal={deleteModalClosed}/>
                </div>
             </section>
            }
            {isUpdateModalOpen && <section className='update-modal'>
                <div className='modal-content' data-aos="zoom-out">
                    <div className='modal-header'>
                        <h1>UPDATE POST</h1>
                        <div><IoClose onClick={updateModalClosed} className='update-icon'/></div>
                    </div>
                    <UpdateBlog updateBlogData={selectedBlog} updateCallback={onUpdate} />
                </div>    
              </section>
            }
            <m.div className='home-section-container' initial={{y:"100%"}} animate={{y:"0%"}} transition={{duration: 0.75, ease: "easeOut"}} exit={{opacity:1}}>
                <form className="search-form">
                    <div>
                        <div className="search-bar" data-aos="slide-right" data-aos-delay="800">
                            <IoSearch/>
                            <input placeholder="type search post" id="search-input" 
                                value={searchInput} 
                                onChange={handleSearchInputChange}
                                onKeyDown={preventFormSubmit}
                                className="search-input"
                                />
                        </div>
                    </div>
                </form>
                {isNotBlog && 
                <div className='home-section-content'>
                    <div className='blog-contents'>
                        <div>
                            <p>Sorry Post Doesnt Exist</p>
                            <p>{new Date().toLocaleString() + ""}</p>
                        </div>
                        <div></div>
                        <div>
                            <p>Lorem ipsum dolor sit amet. In voluptatem voluptas est magni sunt non voluptatibus similique aut molestiae repudiandae rem eligendi laudantium eos neque sint! Aut ullam libero eos soluta praesentium aut assumenda numquam ex deserunt adipisci est modi dolor quo maxime totam est quia quia.</p>
                        </div>
                    </div>
                </div>

                }
                {blogs.map(blog => (
                    <div className='home-section-content' key={blog.blog_id} data-aos="fade-up">
                        <div className="delete-update-icon">
                            <FaRegEdit onClick={() => updateModal(blog)} className='update-icon'/>
                            <RiDeleteBin5Line onClick={() => deleteModal(blog)} className='update-icon'/>
                        </div>
                        <div className='blog-contents'>
                            <div>
                                <p>{blog.blog_title}</p>
                                <p>{blog.blog_date}</p>
                            </div>
                            <div></div>
                            <div>
                                <p>{blog.blog_content}</p>
                            </div>
                        </div>
                    </div>
                ))} 
            </m.div>
        </section>
    )
}