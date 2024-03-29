import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class JoinFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.dialogOpen && this.props.dialogOpen && !this.state.dialogOpen) {
      this.setState({ dialogOpen: true });
    }
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
    this.props.onJoinDialogClosed();
  };

  showContactInfo = () => {
    const hasDiscord = this.props.contactInfo.discordChannelUrl;
    if (hasDiscord) {
      return (
        <p>
          {"Discord: "}
          <a href={hasDiscord}>{hasDiscord}</a>
        </p>
      );
    }
    return null;
  };

  render() {
    return (
      <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Awesome! Here is how you can get in touch with the project lead.
            {this.showContactInfo()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

