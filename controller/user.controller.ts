import { Response, Request } from "express";
import userData from "../model/user.model";
import bcrypt from "bcrypt";

export const Register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullname, isAdmin, stack, email, password } = req.body;

    const salt: string = await bcrypt.genSalt(10);

    const hashName = await bcrypt.hash(fullname, salt);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userData.create({
      isAdmin,
      password: hashPassword,
      email,
      fullname: hashName,
      stack,
    });

    return res.status(200).json({
      status: "user successfully registered",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "an error occured",
      data: error,
    });
  }
};

export const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await userData.findOne({ email });

    if (!user)
      return res.status(401).json({
        status: "user not found",
      });

    const checkPassword = await bcrypt.compare(password, user!.password);

    if (!checkPassword)
      return res.status(401).json({
        status: "incorrect credential",
      });

    return res.status(200).json({
      status: `welcome ${user.fullname}`,
    });
  } catch (error) {
    return res.status(400).json({
      status: "an error while logging",
      data: error,
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userData.find();

    return res.status(200).json({
      status: "data gotten successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "an error occured",
      data: error,
    });
  }
};
