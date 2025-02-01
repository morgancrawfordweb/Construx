const Project = require("../models/Project");
const Organization = require("../models/Organization")

const validateProjectOrganization = async (req, res, next) => {
    const { organizationId, projectId } = req.params;

    try {
        // Ensure the project belongs to the organization
        const project = await Project.findOne({
            _id: projectId,
            organization: organizationId,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found or doesn't belong to this organization." });
        }

        // Attach the project to the request object for further use
        req.project = project;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during validation." });
    }
};