module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAbout:(req,res)=>{
    res.render("about.ejs")
  },
  profileRedirect:(req,res)=>{
    if (req.user && req.user.company) {
      // Redirect to company profile if associated with a company
      res.redirect('/companyProfile');
    } else if (req.user) {
      // Redirect to user profile if not associated with a company
      res.redirect('/userProfile');
    } else {
      // If neither, redirect to home or login
      res.redirect('/');
    }
  },

  
};


