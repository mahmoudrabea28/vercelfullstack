"use strict";
// import { connect, ConnectOptions } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
// export const dbConnect = () =>{
//     connect(process.env.MONGO_URI!, {
//     } as ConnectOptions).then(
//         () => console.log("connect successfully"),
//         (error) => console.log(error)
//     )
// }
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)("mongodb+srv://mahmoudelhanafyz162:Mlbf5X6sMvOkV12b@cluster0.g3orn.mongodb.net/")
        .then(function () { return console.log("connect successfully"); })
        .catch(function (error) { return console.log(error); });
};
exports.dbConnect = dbConnect;
