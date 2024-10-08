import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: 'email is required' });
        }
        if (!password) {
            return res.send({ error: 'password is required' });
        }
        if (!phone) {
            return res.send({ error: 'phone no is required' });
        }
        if (!address) {
            return res.send({ error: 'address is required' });
        }
        if (!answer) {
            return res.send({ error: 'answer is required' });
        }




        const existuser = await userModel.findOne({ email })
        if (existuser) {
            return res.status(200).send({
                success: true,
                message: "user already ecists..please login",

            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, phone, address, answer, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: "successfully saved",
            user

        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error

        })
    }


};

export const loginContoller = async (req, res) => {

    try {
        const { email, password } = req.body
        //if even one of them doesn't match..reject
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Username or Password..try again'
            })
        }
        //check if user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Successful login",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer: user.answer,
                role: user.role,

            },
            token,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }


}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};


//test
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};