import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../Client.js';
import './PostDetails.css';


const PostDetails = () => {

    let { id } = useParams();

    const [post, setPost] = useState({});


    const [comment, setComment] = useState("");
    
    useEffect( ()=> { 
        const fetchPost = async () => {
            let {data, error} = await supabase.from("post").select().eq("id", id);
            setPost(data[0]);
            setPostDate(data[0].created_at.split("-"));
        }
        fetchPost();
        
        
    }, [post]) ;
    
    const deletePost = async () => {    
        await supabase.from("post").delete().eq("id", id);
        window.location = "/";
    }
    
    const increaseCount = async () => {
        let newCount = post.upVoteCount + 1;
        await supabase.from("post").update({upVoteCount: newCount}).eq("id", id);
        setPost({...post, upVoteCount: newCount});
    }

    const addComment = async () => {
        let newComments = post.comments;
        newComments[Object.keys(post.comments).length + 1] = comment;
        await supabase.from("post").update({comments: newComments}).eq("id", id);
        setPost({...post, comments: newComments});
        setComment("");
    }

    const handleChange = (event) => {
        setComment(event.target.value);
    }

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

    return(
        <>
            {post? 
            <div className = 'full-post'>
                <div className = "post-details">
                    <p>Posted {timeCreated} {time} Ago </p>
                    <h2>{post.title}</h2>
                    {post.img ? <img src={post.img} alt={post.title}/> : null}
                    <p>{post.descrip}</p>
                    <div className = "buttons">
                        <div className='upvote-container'> 
                            <button onClick = {increaseCount} className = 'increase-count'>❤️</button>
                            <h4>{post.upVoteCount} UpVotes</h4>
                        </div>
                        <div className = "edit-delete"> 
                            <button onClick = {() => window.location = `/editPost/${id}`}>Edit Post</button>
                            <button onClick = {deletePost}>Delete Post</button>
                        </div>
                    </div>
                </div> 
                <div className = 'comments'>
                    <h3>Comments</h3>
                    {post.comments && Object.keys(post.comments).length > 0 ? 
                        Object.entries(post.comments).map(([key, value]) => {
                            return(
                                <div className = 'comment' key = {key}>
                                    <p>- {value}</p>
                                </div>
                            );
                        })
                        : null}
                    <div className = 'leave-comment'>
                        <input onChange = {handleChange} value = {comment}  className = "user-comment" type = "text" placeholder='Leave a Comment'></input>
                        <button onClick = {addComment}  className = "submit-comment">➤</button>
                    </div>
                </div>
            </div>
                : null}

        </>
    );
};

export default PostDetails;