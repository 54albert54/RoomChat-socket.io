// document.cookie = `username=${username.value}`; add cookie to browser
//  document.location.href = "/";  go to home
export default function checkCookie(req: any, res: any, next: any) {
  if (req.cookies.username) {
    // npm i cookie-parser --save-dev //check cookie
    // npm install --save @types/cookie-parser for don't error typescript
    next();
  } else {
    res.redirect("/register");
  }
}
