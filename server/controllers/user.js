import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendWelcomeMail, sendVerificationEmail } from "../utils/signupMail.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body;

    if (!(fullName && email && password && dob)) {
        return res.json({
            success: false,
            message: "All fields are required",
            data: null
        });
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    });

    if (existedUser) {
        return res.json({
            success: false,
            message: "User already registered",
            data: null
        });
    }

    const hashedPassword = await bcryptjs.hashSync(password, 10);

    //verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
        dob: new Date(dob),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });

    try {
        // If email sent successfully, save the user
        await user.save();

        await sendVerificationEmail({
            to: user.email,
            verificationToken,
            userName: user.fullName
        });

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id);

        // await sendMail({
        //     to: email,
        //     userName: fullName,
        //   }); not use

        const { password: pass, ...rest } = user._doc;

        res.json({
            success: true,
            message: `User created successfully! Please verify your email.`,
            data: rest
        });
    } catch (e) {
        res.json({
            success: false,
            message: "Signup failed. " + e.message,
            data: null
        });
    }
};


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

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        // Exclude the password from the user object before sending the response
        const { password: pass, ...rest } = user._doc;

        // Set the cookie and return a single success response
        res.status(200).json({
            success: true,
            message: "User Login successful",
            data: rest
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
            data: null
        });
    }
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        // Find the user with the provided verification code and check if the code is still valid
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }, // Ensure the token is not expired
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Verification code is invalid or expired!",
            });
        }

        // Update user properties to mark them as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Remove verification token
        user.verificationTokenExpiresAt = undefined; // Remove token expiration date
        await user.save();

        await sendWelcomeMail({
            to: user.email,
            userName: user.fullName,
        });

        const { password: pass, ...rest } = user._doc;

        // Set the cookie and return a single success response
        res.status(200).json({
            success: true,
            message: "Email verified successfully!",
            data: rest
        });

    } catch (error) {
        console.error("Error in email verification:", error);
        res.status(500).json({
            success: false,
            message: "Error in verifying the user!",
            error: error.message,
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

export { postSignup, postLogin, postLogout, getProfile, verifyEmail }