import React, { Component } from "react";
import "./Project.css";
import PropTypes from "prop-types";

export default class ProjectCard extends Component {
  render() {
    return (
      <div className="Project">
        <h1>{this.props.projectName}</h1>
        <h2>
          {this.props.projectLeadId} | <u>{this.props.projectLeadRole}</u>
        </h2>
        <p>{this.props.projectDescription}</p>
        <h3>
          Looking for:
          {this.props.rolesNeeded.map(r => " " + r + ", ")}
        </h3>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  projectLeadId: PropTypes.string.isRequired,
  projectLeadRole: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectDescription: PropTypes.string.isRequired,
  rolesNeeded: PropTypes.array.isRequired,
  contactInfo: PropTypes.object.isRequired
};
