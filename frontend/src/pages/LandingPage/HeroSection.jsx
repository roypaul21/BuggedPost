import {motion as m} from "framer-motion"
import {container, item} from "./animation";
import {Link} from "react-router-dom";

export default function HeroSection() {
    return(
        <m.section className="hero-section" initial={{y:"100%"}} animate={{y:"0%"}} transition={{duration: 0.5, ease: "easeOut"}} exit={{opacity:1}}>
            <m.div className="hero-section-header" variants={container} initial="hidden" animate="show">
                <div className="hero-section-title">
                    <m.h1 variants={item}>
                        BUGGED? <span>THREAD POST</span> 
                    </m.h1>
                </div>
                <div className="hero-section-body">
                    <m.h1 variants={item}>
                        Got Something To Say? BZZZZZ
                    </m.h1>
                </div>

                <div className="hero-section-btn">  
                    <Link to="/home-admin">
                        <m.button className="hero-btn" variants={item}>Visit Home</m.button>
                    </Link>
                
                    <Link to="/">
                        <m.button className="hero-btn" variants={item}>Get In Touch</m.button>
                    </Link>
                </div>
            </m.div>
        </m.section>
    )
}