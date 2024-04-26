/* The validateMiddleWare middleware simply checks if any of the form fields are null (which means
  that they are not entered by the user) and if so, redirect them back to the create post page. */

module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/create')
    }
    next()
};