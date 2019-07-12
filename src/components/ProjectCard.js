import React, { Component } from "react";
import "./ProjectCard.css";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import JoinFormDialog from "./JoinFormDialog";

export default class ProjectCard extends Component {
  handleClickDelete = (e) => {
    console.log(this.props.projectId)
  }

  render() {
    return (
      <Card className="ProjectCard">
       <CardHeader
        className="ProjectCardHeader"
        action={
          <IconButton aria-label="Delete" onClick={this.handleClickDelete}>
            <DeleteForeverIcon />
          </IconButton>
        }
        title={this.props.projectName}
        subheader={`${this.props.projectLeadId} | ${this.props.projectLeadRole}`}
      />
      <CardMedia
        className="ProjectCardImage"
        image="/default_preview_image.png"
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
      <CardActions disableSpacing>
        <JoinFormDialog contactInfo={this.props.contactInfo} />
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
  rolesNeeded: PropTypes.array.isRequired,
  contactInfo: PropTypes.object.isRequired
};
