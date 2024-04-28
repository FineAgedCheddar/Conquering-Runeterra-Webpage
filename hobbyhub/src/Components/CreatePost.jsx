import { useEffect, useState } from 'react';
import { supabase } from "../Client.js";
import "./CreatePost.css";


const CreatePost = () => {

    const [postDetails, setPostDetails ] = useState({ title: "", img : "", descrip: "", upVoteCount: 0, comments: {}})

    const makePost = async () => {
        await supabase.from("post").insert({title: postDetails.title, img : postDetails.img, descrip: postDetails.descrip, upVoteCount: 0, comments: {}})
        window.location = "/";
    }

    const change = (event) => {
        const {name, value} = event.target;
        setPostDetails({...postDetails, [name]: value})
    }

    return(
        <>
            <div className = "post-creator">
                <input className = "title-i" type = "text" placeholder = "Title"  onChange = {change} name = "title"/>
                <textarea rows = "50" cols = "50" className = "descrip-i" placeholder = "Content"  onChange = {change} name = "descrip" />
                <input className = "img-i" type = "text" placeholder = "Image Link (optional)"  onChange = {change} name = "img"/>
                <button onClick = {makePost}>Create Post</button>
            </div>
        </>
    );
};

export default CreatePost;