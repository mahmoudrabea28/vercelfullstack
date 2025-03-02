"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;
//     if(!token) return res.status(HTTP_UNAUTHORIZED).send();
//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;
//     } catch (error) {
//         res.status(HTTP_UNAUTHORIZED).send();
//     }
//     return next();
// }
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    console.log("Token received:", token); // Add this line
    // if (!token) {
    //     console.log("Token missing"); //add this line
    //     return res.status(HTTP_UNAUTHORIZED).send();
    // }
    // try {
    //     const decodedUser = verify(token, process.env.JWT_SECRET!);
    //     req.user = decodedUser;
    //     console.log("Decoded user:", decodedUser); // Add this line
    // } catch (error) {
    //     console.log("Token verification failed:", error); // Add this line
    //     res.status(HTTP_UNAUTHORIZED).send();
    // }
    return next();
});
