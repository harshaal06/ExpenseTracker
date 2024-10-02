import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body;

    if (!(fullName && email && password && dob)) {
        return res.json({
            success: false,
            message: "All fields are required",
            data: null
        })
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if (existedUser) {
        return res.json({
            success: false,
            message: "User already registered",
            data: null
        })
    }
    const hashedPassword = await bcryptjs.hashSync(password, 10)
    const user = new User({ fullName, email, password: hashedPassword, dob: new Date(dob) });

    try {
        await user.save();

        res.json({
            success: true,
            message: `User signup successful`,
            data: null
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required",
            data: null
        });
    }

    try {
        const user = await User.findOne({
            $or: [{ email }]
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email.",
                data: null
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.json({
                success: false,
                message: "Invalid password.",
                data: null
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Exclude the password from the user object before sending the response
        const { password: pass, ...rest } = user._doc;

        // Set the cookie and return a single success response
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            success: true,
            message: "User Login successful",
            data: rest
        });

        // No need for the if block, as response has already been sent
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
            data: null
        });
    }
};

const postLogout = async (req, res) => {
    // Clear the cookie
    res.clearCookie('access_token', { path: '/' });

    // Respond to confirm logout
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const getProfile = async (req, res) => {
    const { id } = req.user; // Extract user ID from token
    

    try {
        const user = await User.findById(id).select('-password -updatedAt'); // Exclude password and updatedAt fields
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'User data fetched successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

    // const postLogin = async (req, res) => {
    //     const { email, password } = req.body;

    //     if (!email) {
    //         return res.json({
    //             success: false,
    //             message: "Email is required",
    //             data: null
    //         })
    //     }
    //     try {
    //         const user = await User.findOne({
    //             $or: [{ email }]
    //         })

    //         if (!user) {
    //             return res.json({
    //                 success: false,
    //                 message: "Invalid email.",
    //                 data: null
    //             })
    //         }
    //         const validPassword = bcryptjs.compareSync(password, user.password)

    //         if (!(validPassword)) {
    //             return res.json({
    //                 success: false,
    //                 message: "Invalid password.",
    //                 data: null
    //             })
    //         }

    //         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    //         const {password: pass, ...rest} = user._doc

    //         res.cookie("access_token", token, {httpOnly: true}).status(200).json({
    //             success: true,
    //             message: "User Login successful",
    //             data: rest
    //         })

    //         if (user) {
    //             return res.json({
    //                 success: true,
    //                 message: "User Login successful",
    //                 data: user
    //             })
    //         }
    //     } catch (e) {
    //         res.json({
    //             success: false,
    //             message: e.message,
    //             data: null
    //         })
    //     }
    // }

export { postSignup, postLogin, postLogout, getProfile }