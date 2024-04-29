module.exports = (req, res) => {

    /* we destroy all session data including the session user id, we then redirect to the
    home page. */

    req.session.destroy(() => {

    ////////////////////////////////

    res.redirect('/')
    })
};