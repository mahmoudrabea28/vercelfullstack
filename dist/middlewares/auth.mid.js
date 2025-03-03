"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_1 = require("../constants/http_status");
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    var secret = process.env.JWT_SECRET || "fallbackinsecuresecret";
    if (!token)
        return res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    try {
        var decodedUser = (0, jsonwebtoken_1.verify)(token, secret);
        req.user = decodedUser;
    }
    catch (error) {
        res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
    return next();
});
// export default (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;
//     console.log("Token received:", token); // Add this line
//     if (!token) {
//         console.log("Token missing"); //add this line
//         return res.status(HTTP_UNAUTHORIZED).send();
//     }
//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;
//         console.log("Decoded user:", decodedUser); // Add this line
//     } catch (error) {
//         console.log("Token verification failed:", error); // Add this line
//         res.status(HTTP_UNAUTHORIZED).send();
//     }
//     return next();
// };
