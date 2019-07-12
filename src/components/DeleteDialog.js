import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { STORAGE_URL } from "../Constants";

export default class DeleteDialog extends React.Component {
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

  handleClickDelete = (e) => {
    this.setState({ dialogOpen: false });
    fetch(`${STORAGE_URL}?projectId=${this.props.projectId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.props.updateProjectList(jsonResponse.projects);
      });
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Delete
        </Button>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Are you sure you want to delete ${this.props.projectName}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClickDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

