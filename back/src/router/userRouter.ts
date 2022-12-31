import express, { Request, Response } from "express";
import { userRepository } from "../mariaDb/repositories/userRepository";
import { authentification, createUser } from "../services/userService";
const userRouter = express.Router();

const { create, getById, getPasswordAndSalt } = userRepository()

userRouter.post(`/`, async function (req: Request, res: Response) {
  const { data } = req.body;
  try {
    await createUser(data)
    res.status(200).json({
      error: false,
      message: "User added"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something wrong happened please retry"
    });
  };
});

userRouter.post("/connection", async function (req: Request, res: Response) {
  const { credentials } = req.body
  try {
    const token = await authentification({ ...credentials })
    res.status(200).json({
      error: false,
      message: "User logged",
      token
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something wrong happened please retry"
    });
  }
});

userRouter.get(`/:id`, async function (req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await getById(id);
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(666).json({

    });
  };
});


export { userRouter };
