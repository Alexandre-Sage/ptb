import express, { Request, Response } from "express";
import { decodeToken } from "../modules/auth/jsonWebToken";
import { joiErrorHandling } from "../modules/validation/joiHigherOrder";
import { UserService } from "../services/userService";

export class UserRouter {
  private readonly router = express.Router();
  constructor(private readonly service: UserService) {
    this.service = service;
  }
  initRouter = () => {
    const { router, service } = this;
    router.post(`/`, async function (req: Request, res: Response) {
      const { passwordConfirmation, ...data } = req.body.data;
      //if (data.password !== passwordConfirmation)
      //  throw new CustomError(500, "Password mismatching");
      try {
        await service.createUser(data);
        res.status(200).json({
          error: false,
          message: "User added",
        });
      } catch (error: any) {
        // console.log(error);
        error = joiErrorHandling(error);
        res.status(error.httpStatus ?? 500).json({
          error: true,
          message: error.message ?? "Something wrong happened please retry",
        });
      }
    });
    router.post("/connection", async function (req: Request, res: Response) {
      const { credentials } = req.body;
      try {
        const token = await service.authentification({ ...credentials });
        res.status(200).json({
          error: false,
          message: "Welcome Back",
          token,
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });

    router.get(`/:id`, async function (req: Request, res: Response) {
      const { id } = req.params;

      try {
        const { id: tokenId } = await decodeToken(req);
        const { editionDate, lastConnection, password, salt, ...user } =
          await service.getById(tokenId);
        res.status(200).json({
          user,
          error: false,
        });
      } catch (error) {
        console.log({ error });
        res.status(403).json({
          error: true,
          message: "Something wrong happened please retry",
        });
      }
    });
    return router;
  };
}
