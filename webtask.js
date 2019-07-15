/**
 * This is the code running on webtask to handle storage
 */
module.exports = async function (context, cb) {
  try {
    const projectsObject = await getProjects(context.storage);

    // Delete if query projectId exists
    if (context.query && context.query.projectId) {
      delete (projectsObject.projects[context.query.projectId]);
      await setProjects(context.storage, projectsObject);
      cb(null, convertToArrayResponse(projectsObject));
      return;
    }

    if (!context.body) {
      cb(null, convertToArrayResponse(projectsObject));
      return;
    }

    const {
      projectId,
      projectLeadId,
      projectLeadRole,
      projectName,
      projectDescription,
      previewImageUrl,
      rolesNeeded,
      contactInfo
    } = context.body;

    if (projectId) {
      // modify existing
      const existingProject = projectsObject.projects[projectId];
      projectsObject.projects[projectId] = Object.assign(existingProject, {
        projectId,
        projectLeadId: projectLeadId ? projectLeadId : existingProject.projectLeadId,
        projectLeadRole: projectLeadRole ? projectLeadRole : existingProject.projectLeadRole,
        projectName: projectName ? projectName : existingProject.projectName,
        projectDescription: projectDescription ? projectDescription : existingProject.projectDescription,
        previewImageUrl: previewImageUrl ? previewImageUrl : existingProject.previewImageUrl,
        rolesNeeded: rolesNeeded ? rolesNeeded : existingProject.rolesNeeded,
        contactInfo: contactInfo ? contactInfo : existingProject.contactInfo,
      });
      await setProjects(context.storage, projectsObject);
      cb(null, convertToArrayResponse(projectsObject));
      return;
    }

    // Make sure we have required fields
    if (projectLeadId && projectLeadRole && projectName) {
      const projects = projectsObject.projects;

      // Create new
      const newProjectId = require('uuid/v4')();
      projects[newProjectId] = {
        projectId: newProjectId,
        projectLeadId,
        projectLeadRole,
        projectName,
        projectDescription,
        previewImageUrl,
        rolesNeeded,
        contactInfo,
        creationDate: new Date(),
      };
      projectsObject.projects = projects;
      await setProjects(context.storage, projectsObject);
    }

    cb(null, convertToArrayResponse(projectsObject));
  } catch (e) {
    cb(e);
  }
};

async function getProjects(storage) {
  return new Promise(resolve => {
    storage.get(function (error, data) {
      if (data && data.projects) {
        resolve(data);
      } else {
        const defaultProjects = { projects: [] };
        resolve(defaultProjects);
      }
    });
  });
}

async function setProjects(storage, projects) {
  return new Promise((resolve, reject) => {
    storage.set(projects, { force: 1 }, function (error) {
      if (error) reject();
      resolve();
    });
  });
}

function convertToArrayResponse(projectsObject) {
  const response = Object.values(projectsObject.projects)
  response.sort(function (a, b) {
    return new Date(b.creationDate) - new Date(a.creationDate);
  });
  return response;
}
