import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { supabase } from "../Client.js;
import "./Taskbar.css";

const Taskbar = () => {
    const { setUserSearch } = useContext(SearchContext);

    const handleChange = (event) => {
        setUserSearch(event.target.value);
    };

    const [post, setPost] = useState(null);
    
    useEffect( ()=> {
        const fetchPosts = async () => {
                let { data } = await supabase.from("post").select().order("created_at", {ascending: false});
                setPost(data);
                
            } 

    
        fetchPosts()
        
    },[]);

    
    return( 
        
        <>
            <div className="taskbar">
                <h1>Conquering Runeterra</h1>
                <input onChange = {handleChange} type="text" placeholder="Search For Posts"></input>
                <button>⌕</button>
                <Link className = "home-b" style={{ color: 'white' }} to = "/"><h2>Home</h2></Link>
                <Link className = "create-b" style={{ color: 'white' }} to = "/createPost"><h2>Create Post</h2></Link>
                {post? console.log(post) : null}
            </div>
            <Outlet /> 
        </>
    );
};

export default Taskbar;
