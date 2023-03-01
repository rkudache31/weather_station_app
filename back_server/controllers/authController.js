const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const UserOTPVerification = require('../models/UserOTPVerification');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

//Nodemailer stuff
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'sourabhhawle108@gmail.com',
    pass: 'upvmpdydkdibqpin'
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready for message');
    console.log(success);
  }
});

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter ${otp} in the app to verify your email and address`
    };
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await new UserOTPVerification({
      userID: _id,
      otp: hashedOTP,
      creatdAt: Date.now(),
      expiresAt: Date.now() + 3600000
    });
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: 'PENDING',
      message: 'Verification otp email send',
      userID: _id,
      email
    });
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error.message
    });
  }
};

// exports.getme = catchAsync(async (req, res, next) => {
//   const defaultReturnObject = { authenticated: false, user: null };

// });

// res.status(201).json({
//   status: 'success',
//   token,
//   data: {
//     user: newUser
//   }
// });

exports.signup = catchAsync(async (req, res, next) => {
  try {
    let { name, email, password, passwordConfirm, role } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    passwordConfirm = passwordConfirm.trim();
    role = role.trim();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      passwordConfirm === '' ||
      role === ''
    ) {
      res.json({
        status: 'FAILED',
        message: 'Empty input fields!'
      });
    } else {
      User.find({ email }).then(result => {
        if (result.length) {
          res.json({
            status: 'FAILED',
            message: 'User is already Exist'
          });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role
          });
          // const token = signToken(newUser._id);
          newUser.save().then(result => {
            sendOTPVerificationEmail(result, res);
          });
        }
      });
    }
  } catch (error) {
    res.json({
      status: 'Failed',
      message: 'An error occurred while saving user account!'
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // 1) Check if email and password exist
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    user
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1)Getting token and check of it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  //2)Verifications token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)Check if user still exists

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  //4)Check if user changed passwords after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

//check if user is logged in
exports.checkUser = catchAsync(async (req, res, next) => {
  let currentUser;
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
  } else {
    currentUser = null;
  }
  res.status(200).send({ currentUser });
});

//log user out
exports.logoutUser = catchAsync(async (req, res) => {
  res.cookies('jwt', 'loggedout', {
    expires: new Date(Date.now + 1 * 1000),
    httpOnly: true
  });
  res.status(200).send('user is logged out');
});

exports.verifyOTP = catchAsync(async (req, res) => {
  try {
    let { userID, otp } = req.body;
    if (!userID || !otp) {
      throw Error('Enter Otp details are not allowed');
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userID
      });
      if (UserOTPVerificationRecords <= 0) {
        throw new Error(
          "Account record doesn't exist or has been verified already.Pleas sign up or login "
        );
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userID });
          throw new Error('Code has expired. Please Request again');
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            throw new Error('Invalid code passed.Check your inbox.');
          } else {
            await User.updateOne({ id: userID }, { verified: true });
            await UserOTPVerification.deleteMany({ userID });
            res.json({
              status: 'Verified',
              message: 'User email Verified Successfully'
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error.message
    });
  }
});
