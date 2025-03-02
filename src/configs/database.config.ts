import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () =>{
    connect(process.env.MONGO_URI!, {
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}

// import { connect } from 'mongoose';

// export const dbConnect = () => {
//     connect("mongodb+srv://rabea:f0ggFYLkBpOMgeMZ@cluster0.gadj2.mongodb.net/")
//         .then(() => console.log("connect successfully"))
//         .catch((error) => console.log(error));
// };