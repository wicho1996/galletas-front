import * as React from "react";

// routing
import Routes from './routes';
import NavigationScroll from './routes/NavigationScroll';
import './App.css'

// import ListTest from "./views/listTest";


function App() {
  return (
    <NavigationScroll>
      <Routes />
    </NavigationScroll>
      
  );
}

export default App;
