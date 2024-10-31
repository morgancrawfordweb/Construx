module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAbout:(req,res)=>{
    res.render("about.ejs")
  },
  profileRedirect:(req,res)=>{
    if (req.user && req.user.organization) {
      // Redirect to organization profile if associated with a organization
      res.redirect('/organizationProfile');
    } else if (req.user) {
      // Redirect to user profile if not associated with a organization
      res.redirect('/userProfile');
    } else {
      // If neither, redirect to home or login
      res.redirect('/');
    }
  },

  
};


