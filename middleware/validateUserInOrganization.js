const Project = require("../models/Project");
const Organization = require("../models/Organization")

module.exports = validateUser = async (req, res, next) => {
    const { organizationId, projectId } = req.params;
    const user = req.user._id

    try {
        // Ensure the project belongs to the organization
        const project = await Project.findOne({
            _id: projectId,
            organization: organizationId,
        });
        
        const organization = await Organization.findOne({
            _id: organizationId, 
        })

        if(!organization){
            return res.status(404).json({message: "Organization does not exist or it cant be found"})
        }

        // Attach the project to the request object for further use

        // console.log('project for validate user test', project)
//         console.log("Project:", project);
// console.log("Organization:", organization);
// console.log("Organization Users:", organization.users);
// console.log("User ID:", user);

if (organization.users.some(u => u.userId.toString() === user.toString())) {
    console.log('IM HERE');
    return next(); // Proceed if user is in the organization
} else {
    console.log('NOT');
    console.log("organization users are right here MAN", organization.users);
    return res.redirect("/networkProfile"); // Redirect if user is not part of the organization
}
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during validation." });
    }
};

