/* eslint-disable no-else-return */
const Node = require('./../models/nodeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const nodemailer = require('nodemailer');
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
exports.getAllNodes = catchAsync(async (req, res, next) => {
  const node = await Node.find({ isDeleted: false });
  //Send Response
  res.status(200).json(node);
});

exports.getAllNodesTempDelet = catchAsync(async (req, res, next) => {
  const node = await Node.find({ isDeleted: true });
  //Send Response
  res.status(200).json(node);
});

exports.getNodeByUsers = catchAsync(async (req, res, next) => {
  const node = await Node.find({ owner: req.params.id, isDeleted: false });
  // for (let i = 0; i < node.length; i++) {
  //   const { emailId } = node[i];
  //   const { templow } = node[i];
  //   const { temphigh } = node[i];
  //   const { uid } = node[i];
  //   console.log('templow', templow, 'temphigh', temphigh);
  //   node[i].data.slice(-1).map(async (index, items) => {
  //     console.log(index.temperature);
  //     if (index.temperature <= templow) {
  //       const mailOptions = {
  //         from: process.env.AUTH_EMAIL,
  //         to: emailId,
  //         subject: 'Node Condition Data',
  //         html: `<p>Node ${uid} is giving Wrong Data</p>`
  //       };
  //       await transporter.sendMail(mailOptions);
  //       console.log('Mail Send');
  //     } else {
  //       console.log('Not send');
  //     }
  //   });
  // }
  if (!node) {
    return next(new AppError('No node found with Id', 404));
  }
  res.status(200).json(node);
});

exports.createNodeId = catchAsync(async (req, res, next) => {
  try {
    const node = await Node.findOne({ uid: req.params.id });
    node.data.push(req.body);
    node.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

exports.getTheNodeRange = catchAsync(async (req, res, next) => {
  try {
    // const uid = req.query.uid;
    const { uid, startDate, endDate } = req.query;
    // const endDate = req.query.endDate;
    // console.log(uid, startDate, endDate);
    const result = await Node.aggregate([
      { $match: { uid: uid } },
      { $unwind: '$data' },
      {
        $match: {
          'data.Date': { $gte: new Date(startDate), $lt: new Date(endDate) }
        }
      },
      {
        $group: { _id: '$uid', numNode: { $sum: 1 }, data: { $push: '$data' } }
      }
    ]);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});
exports.createNode = catchAsync(async (req, res, next) => {
  const node = await Node.findOne({ uid: req.body.uid });
  if (node) {
    node.data.push(req.body.data[0]);
    res.status(200).json({ success: true });
    node.save();
  } else {
    const {
      uid,
      location,
      sublocation,
      templow,
      temphigh,
      humilow,
      humihigh,
      windlow,
      windhigh,
      baromelow,
      baromehigh,
      globallow,
      globalhigh,
      rainlow,
      rainhigh,
      temperature,
      humidity,
      windSpeed,
      barometric,
      globalRadiation,
      rain
    } = req.body;
    const newNode = await Node.create({
      uid,
      user: req.user.name,
      emailId: req.user.email,
      location,
      sublocation,
      templow,
      temphigh,
      humilow,
      humihigh,
      windlow,
      windhigh,
      baromelow,
      baromehigh,
      globallow,
      globalhigh,
      rainlow,
      rainhigh,
      owner: req.user.id,
      data: [
        {
          temperature,
          humidity,
          windSpeed,
          barometric,
          globalRadiation,
          rain
        }
      ]
    });
    res.status(201).json({
      status: 'success',
      data: {
        node: newNode
      }
    });
  }
});

exports.updateNode = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!node) {
    return next(new AppError('No node found with that Id', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      node
    }
  });
});

// exports.deleteNode = catchAsync(async (req, res, next) => {
//   const node = await Node.findOneAndDelete(req.params.uid);
//   if (!node) {
//     return next(new AppError('No node found with ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

exports.deleteNodeTemp = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id
    },
    { isDeleted: true },
    { new: true }
  );
  if (!node) {
    return next(new AppError('No node found with ID', 404));
  }
  res.send({ message: 'Node Update Successfully' });
  res.status(204).json({
    status: 'success',
    data: node
  });
});

exports.restoreNode = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndUpdate(
    { _id: req.params.id },
    { user: req.body.user, isDeleted: false },
    { new: true }
  );
  if (!node) {
    return next(new AppError('No node found with ID', 404));
  }
  res.send({ message: 'Allocation Another User successfully' });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteNodePerm = catchAsync(async (req, res, next) => {
  const node = await Node.findOneAndDelete({ _id: req.params.id });
  if (!node) {
    return next(new AppError('No node found with ID', 404));
  }
  res.send({ message: 'Delete successfully' });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// exports.deleteNode = catchAsync(async (req, res, next) => {
//   const node = await Node.findOneAndDelete(req.params.uid);
//   if (!node) {
//     return next(new AppError('No node found with ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });
