const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    if (req.user){
        return res.sendFile(path.join(__basedir, 'public/dashboard/index.html'));
    }

    return res.sendFile(path.join(__basedir, 'public/landing/index.html'));
});

router.get(['/login', '/register', '/main'], (req, res) => {
    return res.sendFile(path.join(__basedir, 'public/dashboard/index.html'));
});

module.exports = router;