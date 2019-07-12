import React, { Component } from "react";
import "./ProjectCard.css";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import JoinFormDialog from "./JoinFormDialog";
import DeleteDialog from "./DeleteDialog";

export default class ProjectCard extends Component {

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
          title="Preview Image"
        />
        <CardContent className="ProjectCardContent">
          <Typography variant="body2" color="textSecondary">
            {this.props.projectDescription}
          </Typography>
          <Typography variant="body1">
            Looking for:
          {this.props.rolesNeeded.map(r => " " + r + ", ")}
          </Typography>
        </CardContent>
        <CardActions>
          <JoinFormDialog contactInfo={this.props.contactInfo} />
          <DeleteDialog
            projectId={this.props.projectId}
            projectName={this.props.projectName}
            updateProjectList={this.props.updateProjectList}>
          </DeleteDialog>
        </CardActions>
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
