import React from "react";
import BlogLogo from "../../assets/Blog-Logo.png"

function Logo({
    className=''
}) {
    return (
        <div>
            <img 
            src={BlogLogo} 
            alt="Logo" 
            className={`${className}`}
            />
        </div>
    )
}

export default Logo;