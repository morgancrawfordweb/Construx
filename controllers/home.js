module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHowToInstructional:(req,res)=>{
    const previousPage = req.get('referer') || '/'; // Fallback to home page if no referer
    res.render('instructional', { previousPage });
  }
};


