"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {}).then(function () { return console.log("connect successfully"); }, function (error) { return console.log(error); });
};
exports.dbConnect = dbConnect;
// import { connect } from 'mongoose';
// export const dbConnect = () => {
//     connect("mongodb+srv://rabea:f0ggFYLkBpOMgeMZ@cluster0.gadj2.mongodb.net/")
//         .then(() => console.log("connect successfully"))
//         .catch((error) => console.log(error));
// };
