import React, { useState, useEffect } from "react";
import { supabase } from "../Client.js";
import { Link, useParams } from "react-router-dom";

const EditPost = () => {

    const [prevPost, setPrevPost] = useState({});

    useEffect(() => { 
        const getPrevPost = async () => {
            const {data, error} = await supabase.from("post").select().eq("id", id);
            setPostDetails(data[0]);
        }
        getPrevPost();
    }, []);


    const { id } = useParams();

    const [postDetails, setPostDetails ] = useState({ title: "", img : "", descrip: "", upVoteCount: 0, comments: {}})

    const editPost = async () => {
        await supabase.from("post").update({title: postDetails.title, img : postDetails.img, descrip: postDetails.descrip}).select().eq("id", id);
        window.location = "/";
    }

    const change = (event) => {
        const {name, value} = event.target;
        setPostDetails({...postDetails, [name]: value})
    }

    return(
        <>
            {prevPost?
                <div className = "post-creator">
                    <input className = "title-i" type = "text" placeholder = "Title" value = {postDetails.title} onChange = {change} name = "title"/>
                    <textarea rows = "50" cols = "50" className = "descrip-i" placeholder = "Content" value = {postDetails.descrip} onChange = {change} name = "descrip" />
                    <input className = "img-i" type = "text" placeholder = "Image Link (optional)" value = {postDetails.img} onChange = {change} name = "img"/>
                    <button onClick = {editPost}>Post</button>
                </div>
            : null}
        </>
    );
};

export default EditPost;
