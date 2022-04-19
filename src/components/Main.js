import React from "react";
import { withRouter } from "react-router";
import Restaurants from "./Restaurants";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // if (localStorage.getItem("username") === null) {
    //   const {
    //     history: { push },
    //   } = this.props;
    //   push("/");
    // }
  }

  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  render() {
    return (
      <div className="space-y-5 h-screen flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-semibold text-blue-800">
            Food Ordering System
          </h2>
          <button
            class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        
        </div>
        <Restaurants/>
      </div>
    );
  }
}

export default withRouter(Main);
