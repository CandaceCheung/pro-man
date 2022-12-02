import { AuthService } from "../services/authServices";
import { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const result = await this.authService.login(req.body.username, req.body.password);
            res.json({ success: !!result });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[LOG] Fail to login." });
        }
    }
}