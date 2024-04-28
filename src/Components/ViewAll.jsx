import { useEffect, useState } from "react";
import { supabase } from "../Client.js";
import { Link } from "react-router-dom";
import "./ViewAll.css";
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

const ViewAll = () => {
    
    const { userSearch } = useContext(SearchContext);

    const [posts, setPosts] = useState([]);
    
    const [timePress, setTimePress] = useState(true);

    const [votePress, setVotePress] = useState(false);  

    const [filteredPosts, setFilteredPosts] = useState({});

    useEffect( ()=> {
        const fetchPosts = async () => {
            if (timePress)
            {
                let { data } = await supabase.from("post").select().order("created_at", {ascending: false});
                setPosts(data);
                setFilteredPosts(data);
            } 
            else if (votePress)
            {
                let { data } = await supabase.from("post").select().order("upVoteCount", {ascending: false});
                setPosts(data);
                setFilteredPosts(data);
            }

        }
    
        fetchPosts()
        
    },[timePress, votePress]);

    

    useEffect(() => {
        if (userSearch !== "" || userSearch != " ")
        {
            setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(userSearch.toLowerCase())));
        }
    }, [userSearch]);


    const swapToVote = () => {
        if (votePress)
        {   
        
        }
        else {
            setTimePress(!timePress);
            setVotePress(!votePress);
        }

    }

    const swapToTime = () => {
        if (timePress)
        {
            
        }
        else{ 
            setTimePress(!timePress);
            setVotePress(!votePress);
        }   
    }

    return(
        <>
            <div className = "sort">
                <h2>Sort By: </h2>
                <button onClick = {swapToTime} className = {"time" + `${timePress? "-pressed" : ""}`} >Time Created</button>
                <button onClick = {swapToVote} className = {"upvote" + `${votePress? "-pressed" : ""}`}>Upvote Count</button>
            </div>
            <div className = "post-gallery">
            {filteredPosts && Object.keys(filteredPosts).length >0 ?  
                filteredPosts.map((post, index) => {
                    const currentTime = new Date();
                    const postTime = new Date(post.created_at);
                    const diffMs = Math.abs(currentTime - postTime); // difference in milliseconds
                    const diffSec = Math.round(diffMs / 1000); // difference in seconds
                    const diffMin = Math.round(diffSec / 60); // difference in minutes
                    const diffHrs = Math.round(diffMin / 60); // difference in hours
                    const diffDays = Math.round(diffHrs / 24); // difference in days
                    let timeCreated = 0;
                    let time = "none";
                    if (diffDays > 0) {
                        timeCreated = diffDays;
                        time = 'Days';
                    } else if (diffHrs >= 1) {
                        timeCreated = diffHrs;
                        time = "Hours"
                    } else if (diffMin >= 1) {
                        timeCreated = diffMin;
                        time = "Minutes";
                    } else {
                        timeCreated = diffSec;
                        time = "Seconds";
                    }
                        return (
                            <div className = "post" key={index}>
                                <Link style = {{color: "white"}}to = {`/postDetails/${post.id}`}> 
                                <p>Posted {timeCreated} {time} Ago </p>
                                <h3>{post.title}</h3>
                                <h5>{post.upVoteCount} UpVotes</h5>
                                </Link>
                            </div>
                        );
                })
                :
                posts && posts.length > 0 ? posts.map((post, index) => {
                    const currentTime = new Date();
                    const postTime = new Date(post.created_at);
                    const diffMs = Math.abs(currentTime - postTime); // difference in milliseconds
                    const diffSec = Math.round(diffMs / 1000); // difference in seconds
                    const diffMin = Math.round(diffSec / 60); // difference in minutes
                    const diffHrs = Math.round(diffMin / 60); // difference in hours
                    const diffDays = Math.round(diffHrs / 24); // difference in days
                    let timeCreated = 0;
                    let time = "none";
                    if (diffDays > 0) {
                        timeCreated = diffDays;
                        time = 'Days';
                    } else if (diffHrs >= 1 ) {
                        timeCreated = diffHrs;
                        time = "Hours"
                    } else if (diffMin >= 1) {
                        timeCreated = diffMin;
                        time = "Minutes";
                    } else {
                        timeCreated = diffSec;
                        time = "Seconds";
                    }
                        return (
                            <div className = "post" key={index}>
                                <Link style = {{color: "white"}}to = {`/postDetails/${post.id}`}> 
                                <p>Posted {timeCreated} {time} Ago </p>
                                <h3>{post.title}</h3>
                                <h5>{post.upVoteCount} UpVotes</h5>
                                </Link>
                            </div>
                        
                        );
                }) : null}
            </div>
        </>
    );
};

export default ViewAll;