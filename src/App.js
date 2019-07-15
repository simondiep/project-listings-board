import React, { Component } from "react";
import ProjectList from "./components/ProjectList";
import NewProjectFormDialogButton from "./components/NewProjectFormDialog";
import Filter from "./components/Filter";
import { STORAGE_URL } from "./Constants";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "", projects: [],
    rolesNeeded: [],
    projectLeadRoles: [] };
  }

  componentDidMount = () => {
    fetch(STORAGE_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        const newRolesNeeded = jsonResponse.map(project => project.rolesNeeded).filter((value, index, self) => self.indexOf(value) === index);
        this.setState({
          projects: jsonResponse,
          rolesNeeded: newRolesNeeded,
          projectLeadRoles: jsonResponse.map(project => project.projectLeadRole).filter((value, index, self) => self.indexOf(value) === index),
        })}
      );
  };

  updateProjectList = projects => {
    this.setState({
      projects
    });
  };

  updateFilters = filters => {
    console.log("this is")
    console.log(this)
    this.setState({
      filters: filters
    });
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
    this.setState({ errorMessage: JSON.stringify(error + info) });
  }

  handleClickOpen = () => { };

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
        <Filter updateFilters={this.updateFilters} rolesNeeded={this.state.rolesNeeded} projectLeadRoles={this.state.projectLeadRoles} />
        <h2>Projects in need of help</h2>
        <ProjectList projects={this.state.projects} rolesNeeded={this.state.rolesNeeded} projectLeadRoles={this.state.projectLeadRoles} updateProjectList={this.updateProjectList} />
      </div>
    );
  }
}