import { BrowserRouter as Router } from 'react-router-dom';
import ViewAll from './Components/ViewAll'
import { useRoutes } from "react-router-dom"
import { SearchProvider } from './context/SearchContext.jsx';
import './index.css'
import Taskbar from "./Components/Taskbar.jsx";
import CreatePost from "./Components/CreatePost.jsx";
import PostDetails from './Components/PostDetails.jsx';
import EditPost from './Components/EditPost.jsx';
import "./App.css";


function App() {
 
  // Sets up routes
  let element = useRoutes([
    {
      path:"/",
      element: <ViewAll />
    },
    {
      path:"/editPost/:id",
      element: <EditPost/>
    },
    {
      path:"/createPost",
      element: <CreatePost/>
    },
    {
      path:"/postDetails/:id",
      element: <PostDetails/>
    }
  ]);

  return (
  
      <SearchProvider>
        <Taskbar />
        {element}
      </SearchProvider>
 
  )
}


export default App
