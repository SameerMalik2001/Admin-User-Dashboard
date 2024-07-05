import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'

// to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {

    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch {
    throw new ApiError(500, "something went wrong while generating refresh and access token")
  }
}

// to register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, role } = req.body;

  const isUserNamePresent = await User.findOne({
    $or: [{ username }],
  });
  if (isUserNamePresent) {
    res.status(401).send("User present already")
  }

  const isMainPresent = await User.findOne({
    $or: [{ email }],
  });
  console.log(isMainPresent);
  if (isMainPresent) {
    res.status(401).send("E-Mail present already");
  }

  const newUser = await User.create({
    username: username,
    email: email,
    password: password,
    role: role
  });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    res.status(402).send("something went wrong while registering the user!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Register Successfully!"));
});

// to login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.setHeader('Access-Control-Allow-Credentials', 'true');

  const user = await User.findOne({
    $or: [{ email }],
  });
  if (!user) {
    return res.status(401).send("User is not exists");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(402).send("Password is not correct");
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const dummyUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    path: '/'
  }

  return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(201)
    .json(new ApiResponse(200, {data:dummyUser, accessToken, refreshToken}, "User login Successfully!"));
});

// to logout usr
const logoutUser = asyncHandler(async (req, res) => {
  console.log("logout user");
  const user  = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: ''
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    // secure: true
  }
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  res.status(200).json(new ApiResponse(200, user, "User Logged out!"));
})

// token validation
const tokenValidation = asyncHandler(async (req, res) => {
  console.log("tokenValidation");
  console.log(req.user._id);
  if(!req.user._id) {
    new ApiError(404, "Invalid token")
  }
  return res.status(200).json(
    new ApiResponse(200, req.user, "token is valid")
  )
})

// to delete user
const userDelete = asyncHandler(async (req, res) => {
  console.log("userDelete")
  const {id} = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User deleted successfully"));
})

// is user admin
const IsUserAdmin = asyncHandler(async (req, res) => {
  console.log("IsUserAdmin");
  if (req.user.role === "admin") {
    return res.status(200).json(new ApiResponse(200, {data: true}, "User is admin"));
  } else {
    return res.status(401).json(new ApiResponse(401, {data: false}, "User is not admin"));
  }
})

// update user
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email, password, role, id } = req.body

  if (!username || !email) {
    throw new ApiError(400, "All fields are required")
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        username,
        email,
        role,
        password: await bcrypt.hash(password, 10)
      }
    },
    { new: true }

  ).select("-password")


  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

// fetch all user
const fetchAllUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, await User.find(), "fetch all user successfully"))
});

// fetch user by id
const fetchUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  let user1 = await User.findById(id)

  return res
    .status(200)
    .json(new ApiResponse(200,user1 , "fetch user by id successfully"))
});


export { fetchAllUser, fetchUser,updateAccountDetails, tokenValidation, userDelete,registerUser, IsUserAdmin,loginUser, logoutUser};
