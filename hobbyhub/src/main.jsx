import React from 'react'
import ReactDOM from 'react-dom';
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
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
