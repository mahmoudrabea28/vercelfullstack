import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';

const router = Router();

router.get(
    "/seed",
    asyncHandler(async (req, res) => {
        const foodCount = await UserModel.countDocuments();
        if (foodCount > 0) {
            res.send("seed is already done");
            return;
        }

        await UserModel.create(UserModel);
        res.send("seed is done");
    })
);

// router.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     const user = sample_users.find(user => user.email === email &&
//         user.password === password)

//     if (user) {
//         res.send(generateTokenResponse(user));
//     } else {
//         res.status(400).send("user name or password is invalid!")
//     }
// })

// router.post(
//     "/login",
//     asyncHandler(async (req, res) => {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email, password });

//         if (user) {
//             res.send(generateTokenResponse(user));
//         } else {
//             res.status(400).send("Username or password is invalid!");
//         }
//     })
// );

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email, password }); //remove password

            if (user) {  // && (await bcrypt.compare(password,user.password))
                res.send(generateTokenResponse(user));
            } else {
                res.status(400).send("Username or password is invalid!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send("Internal server error");
        }
    })
);

const generateTokenResponse = (user: any) => {
    const secret = process.env.JWT_SECRET || "fallbackinsecuresecret"; //Use env variable.
    if (secret === "fallbackinsecuresecret") {
        console.warn("Using insecure fallback jwt secret. Please set the JWT_SECRET environment variable.")
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        secret,
        {
            expiresIn: "30d",
        }
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        ...user.toObject(), //convert mongoose document to plain javascript object.
        token: token,
    };
};

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400)
                .send('User is already exist, please login!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: password,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

// const generateTokenResponse = (user: any) => {
//     const token = jwt.sign(
//         {
//             email: user.email,
//             isAdmin: user.isAdmin,
//         },
//         "SomeRandomText",
//         {
//             expiresIn: "30d",
//         }
//     );

//     user.token = token;
//     return user;
// };

export default router;
