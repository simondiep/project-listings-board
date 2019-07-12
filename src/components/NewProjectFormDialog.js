import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { STORAGE_URL } from "../Constants";

export default class NewProjectFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ dialogOpen: false });
    fetch(STORAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        projectLeadId: "nathaniel",
        projectLeadRole: "developer",
        projectName: "Operation Dumbbell",
        projectDescription:
          "Game where you drop dumbbells out of a plane into the hands of bodybuilders",
        rolesNeeded: ["developer", "designer"],
        contactInfo: {
          discordChannelUrl: "https://discord.gg/zmJGF6f"
        }
      })
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.props.updateProjectList(jsonResponse.projects);
      });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Post new Project
        </Button>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Project Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Awesome! You have an idea and want some help. Fill out this form
              to get started.
            </DialogContentText>
            <TextField
              autoFocus
              id="emailAddress"
              label="Email Address"
              type="email"
            />
            <br />
            <TextField autoFocus id="role" label="Your Role" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
