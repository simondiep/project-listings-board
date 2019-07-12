import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { STORAGE_URL } from "../Constants";

export default class NewProjectFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false, formFields: {} };
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
      body: JSON.stringify(this.state.formFields)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.props.updateProjectList(jsonResponse.projects);
      });
  };

  // TODO delete this after testing
  handleSubmitDummyData = () => {
    this.setState({ dialogOpen: false });
    fetch(STORAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        projectLeadId: "pop123",
        projectLeadRole: "composer",
        projectName: "Final Fantasy Background Music",
        projectDescription: "Making some sweet tunes for a fan-made FF game.",
        rolesNeeded: ["guitarist", "drummer", "pianist"],
        contactInfo: {
          discordChannelUrl: "https://discord.gg/music"
        }
      })
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.props.updateProjectList(jsonResponse.projects);
      });
  };

  onFormChange = (fieldName, event) => {
    let newFieldName = fieldName;
    let newValue = event.target.value;
    if (fieldName === "rolesNeeded") {
      newValue = newValue.split(",");
    } else if (fieldName === "discordChannelUrl") {
      newFieldName = "contactInfo";
      newValue = { discordChannelUrl: newValue };
    }

    this.setState({
      formFields: { ...this.state.formFields, [newFieldName]: newValue }
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  required
                  id="projectLeadId"
                  label="Email Address"
                  type="email"
                  onChange={e => this.onFormChange("projectLeadId", e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="projectLeadRole"
                  label="Your Role"
                  onChange={e => this.onFormChange("projectLeadRole", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="projectName"
                  label="Project Name"
                  onChange={e => this.onFormChange("projectName", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  required
                  id="projectDescription"
                  label="Description"
                  onChange={e => this.onFormChange("projectDescription", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="rolesNeeded"
                  label="List the roles you need for this project, separated by commas"
                  onChange={e => this.onFormChange("rolesNeeded", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="discordChannelUrl"
                  label="URL to your Discord Channel"
                  onChange={e => this.onFormChange("discordChannelUrl", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="previewImageUrl"
                  label="Link to your Preview Image"
                  onChange={e => this.onFormChange("previewImageUrl", e)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmitDummyData} color="default">
              Dummy Data
            </Button>
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
