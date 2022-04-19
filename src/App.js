import "./App.css";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Orders from "./components/Orders";
import AdminMain from "./components/AdminMain";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" >
        <Route path="/" component={Login} exact></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={Main}></Route>
        <Route path="/admin" component={AdminMain}></Route>
        <Route exact path="/order/:id/:name/:isAdmin" component={Orders}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
