import React from "react";
import ProjectCard from "./ProjectCard";

export default function(props) {
  if (!props.projects) return null;
  return (
    <div>
      {props.projects.map(p => {
        return (
          <ProjectCard
            id={p.id}
            projectLeadId={p.projectLeadId}
            projectLeadRole={p.projectLeadRole}
            projectName={p.projectName}
            projectDescription={p.projectDescription}
            rolesNeeded={p.rolesNeeded}
            contactInfo={p.contactInfo}
          />
        );
      })}
    </div>
  );
}
