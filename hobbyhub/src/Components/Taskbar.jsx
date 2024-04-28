import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';


import "./Taskbar.css";
const Taskbar = () => {
    const { setUserSearch } = useContext(SearchContext);

    const handleChange = (event) => {
        setUserSearch(event.target.value);
    };
    return( 
        
        <>
            <div className="taskbar">
                <h1>Conquering Runeterra</h1>
                <input onChange = {handleChange} type="text" placeholder="Search For Posts"></input>
                <button>⌕</button>
                <Link className = "home-b" style={{ color: 'white' }} to = "/"><h2>Home</h2></Link>
                <Link className = "create-b" style={{ color: 'white' }} to = "/createPost"><h2>Create Post</h2></Link>
            </div>
            <Outlet /> 
        </>
    );
};

export default Taskbar;
