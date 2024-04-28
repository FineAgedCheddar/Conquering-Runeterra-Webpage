import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Taskbar from "./Components/Taskbar.jsx";
import CreatePost from "./Components/CreatePost.jsx";
import ViewAll from './Components/ViewAll.jsx';
import PostDetails from './Components/PostDetails.jsx';
import EditPost from './Components/EditPost.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Taskbar />}>
            <Route index = {true} path = "/" element={<ViewAll />} />
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
