import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Taskbar from "./Components/Taskbar.js";
import CreatePost from "./Components/CreatePost.js";
import ViewAll from './Components/ViewAll.js';
import PostDetails from './Components/PostDetails.js';
import EditPost from './Components/EditPost.js';
import { SearchProvider } from './context/SearchContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Taskbar />}>
            <Route index = {true} element={<ViewAll />} />
            <Route index = {false} path = "/createPost" element = {<CreatePost />} />
            <Route index = {false} path = "/postDetails/:id" element = {<PostDetails />} />
            <Route index = {false} path = "/editPost/:id" element = {<EditPost />} />
          </Route> 
          <Route path = "*" element={<h1>Error 404: Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  </React.StrictMode>,
)
