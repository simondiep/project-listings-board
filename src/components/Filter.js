import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = { dialogOpen: false,
            filters: {},
        };
    }
  
    roleFilters = [];
    leadRoleFilters = [];

    handleClickOpen = () => {
      this.setState({ dialogOpen: true });
    };
  
    handleClose = () => {
      this.setState({ dialogOpen: false });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateFilters({
            rolesNeeded: this.roleFilters,
            projectLeadRoles: this.leadRoleFilters,
        });
        this.setState({ dialogOpen: false });
    }

    render() {
        return (
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Filter
              </Button>
              <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Filter by:
                  </DialogContentText>
                    <InputLabel>Projects looking for:</InputLabel>
                    <Select
                    value={this.roleFilters}
                    multiple={true}
                    >
                    {this.props.rolesNeeded.map(role =>
                        <MenuItem value={role}>{role}</MenuItem>
                    )}
                    </Select>
                    <InputLabel>Projects led by a:</InputLabel>
                    <Select
                    value={this.leadRoleFilters}
                    multiple={true}
                    >
                    {this.props.projectLeadRoles.map(role =>
                        <MenuItem value={role}>{role}</MenuItem>
                    )}
                    </Select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="secondary">
                    Close
                  </Button>
                  <Button onClick={this.handleSubmit} color="primary">
                    Submit
                    </Button>
                </DialogActions>
              </Dialog>
            </div>
        )
    }
}