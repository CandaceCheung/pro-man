import { Request, Response } from "express";
import { NotificationService } from "../services/notificationService";

export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    sendMessage = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId
            const targetId = req.body.targetUserId
            const text = req.body.text
            const message = await this.notificationService.sendMessage(userId, targetId, text)
            if (message) {
                res.json({
                    success: true,
                    msg: 'Message Sent Successfully',
                    message
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Send Message Failed',
                })
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Something Went Wrong During Reading Database" });
        }
    }

}