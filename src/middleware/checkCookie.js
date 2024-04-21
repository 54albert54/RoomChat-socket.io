"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// document.cookie = `username=${username.value}`; add cookie to browser
//  document.location.href = "/";  go to home
function checkCookie(req, res, next) {
    if (req.cookies.username) {
        // npm i cookie-parser --save-dev //check cookie
        // npm install --save @types/cookie-parser for don't error typescript
        next();
    }
    else {
        res.redirect("/register");
    }
}
exports.default = checkCookie;
