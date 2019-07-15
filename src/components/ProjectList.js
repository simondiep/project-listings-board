import React from "react";
import ProjectCard from "./ProjectCard";
import Grid from "@material-ui/core/Grid";

export default function(props) {
  if (!props.projects) return null;
  return (
    <div>
        <Grid container justify="center" spacing={2}>
           {props.projects
           .filter(p => (props.rolesNeeded.includes(p.rolesNeeded)))
           .filter(p => (props.projectLeadRoles.includes(p.projectLeadRole)))
           .map(p => {
            return (
                <Grid key={p.projectName} item>
                  <ProjectCard
                    projectId={p.projectId}
                    projectLeadId={p.projectLeadId}
                    projectLeadRole={p.projectLeadRole}
                    projectName={p.projectName}
                    projectDescription={p.projectDescription}
                    rolesNeeded={p.rolesNeeded}
                    contactInfo={p.contactInfo}
                    updateProjectList={props.updateProjectList}
                  />
                </Grid>
            );
          })}
        </Grid>
    </div>
  );
}
