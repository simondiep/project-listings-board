import React, { Component } from "react";
import "./ProjectCard.css";
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import JoinProjectDialog from "./JoinProjectDialog";
import DeleteDialog from "./DeleteDialog";
import { STORAGE_URL } from "../Constants";

export default class ProjectCard extends Component {

  constructor(props) {
    super(props);
    this.state = { joinDialogOpen: false };
  }

  onJoinClick = (role) => {
    this.setState({ joinDialogOpen: true });

    const modifiedRoles = this.props.rolesNeeded;
    const roleIndex = modifiedRoles.indexOf(role);
    if (roleIndex !== -1) {
      modifiedRoles.splice(roleIndex, 1);
    }

    fetch(STORAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        projectId: this.props.projectId,
        rolesNeeded: modifiedRoles,
      })
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.props.updateProjectList(jsonResponse);
      });
  }

  onJoinDialogClosed = () => {
    this.setState({ joinDialogOpen: false });
  }

  render() {
    return (
      <Card className="ProjectCard">
        <CardHeader
          className="ProjectCardHeader"
          title={this.props.projectName}
          subheader={`${this.props.projectLeadId} | ${this.props.projectLeadRole}`}
        />
        <CardMedia
          className="ProjectCardImage"
          image={this.props.previewImageUrl ? this.props.previewImageUrl : "/default_preview_image.png"}
        />
        <CardContent className="ProjectCardContent">
          <Typography variant="body2" color="textSecondary">
            {this.props.projectDescription}
          </Typography>
          <Typography variant="body1">
            Roles Available
          </Typography>
          {this.props.rolesNeeded.map(role =>
            <Chip
              className="ProjectCardRoleChip"
              avatar={<Avatar>Join</Avatar>}
              label={role}
              color="primary"
              variant="outlined"
              onClick={() => this.onJoinClick(role)}
            />)}
        </CardContent>
        <CardActions>
          <DeleteDialog
            projectId={this.props.projectId}
            projectName={this.props.projectName}
            updateProjectList={this.props.updateProjectList}>
          </DeleteDialog>
        </CardActions>
        <JoinProjectDialog
          contactInfo={this.props.contactInfo}
          dialogOpen={this.state.joinDialogOpen}
          onJoinDialogClosed={this.onJoinDialogClosed} />
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectLeadId: PropTypes.string.isRequired,
  projectLeadRole: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectDescription: PropTypes.string.isRequired,
  previewImageUrl: PropTypes.string,
  rolesNeeded: PropTypes.array.isRequired,
  contactInfo: PropTypes.object.isRequired
};
