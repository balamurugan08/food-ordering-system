import "./App.css";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Orders from "./components/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" >
        <Route path="/" component={Login} exact></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={Main}></Route>
        <Route exact path="/order/:id/:name" component={Orders}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
