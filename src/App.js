import React, { Component } from "react";
import ProjectList from "./components/ProjectList";
import NewProjectFormDialogButton from "./components/NewProjectFormDialog";
import { STORAGE_URL } from "./Constants";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "", projects: [] };
  }

  componentDidMount = () => {
    fetch(STORAGE_URL)
      .then(response => response.json())
      .then(jsonResponse =>
        this.setState({
          projects: jsonResponse.projects
        })
      );
  };

  updateProjectList = projects => {
    this.setState({
      projects
    });
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
    this.setState({ errorMessage: JSON.stringify(error + info) });
  }

  handleClickOpen = () => {};

  render() {
    if (this.state.hasError) {
      return <div>Error {this.state.errorMessage}</div>;
    }
    return (
      <div className="App">
        <h1>Project Listings Board</h1>
        <NewProjectFormDialogButton
          updateProjectList={this.updateProjectList}
        />
        <h2>Projects in need of help</h2>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
