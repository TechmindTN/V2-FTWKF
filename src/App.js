import React,{useState, useEffect} from 'react';



import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './pages/examples/Signin';
import Signup from './pages/examples/Signin';

import Settings from './components/Navbar';

function App(){
  const [username, setUsername] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  
  useEffect(() => {
    setUsername(window.localStorage.getItem("username"));
  }, []);

  return (
    <main className="wrapper">
   <Signin/>
    </main>
  );
}
export default App;