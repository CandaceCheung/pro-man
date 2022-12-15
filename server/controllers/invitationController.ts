import { Request, Response } from "express";
import { InvitationService } from "../services/invitationService";
import nodemailer from 'nodemailer'

export class InvitationController {
    constructor(private invitationService: InvitationService) { }

    sendInvite = async (req: Request, res: Response) => {
        try {
            const projectId = req.body.projectId;
            const username = req.body.username;
            
            await this.invitationService.inviteUser(projectId, username);
            
            //send email
            let transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: `${process.env.EMAIL_LOGIN}`, // generated ethereal user
                    pass: `${process.env.EMAIL_PASSWORD}`, // generated ethereal password
                },
            });

            // send mail with defined transport object
            await transporter.sendMail({
                from: `"Pro-man Admin" <${process.env.EMAIL_LOGIN}>`, // sender address
                to: username, // list of receivers
                subject: "Hello, Someone Invited You to Join Pro-man!", // Subject line
                text: "Invitation", // plain text body
                html: "<b>This is a test</b>", // html body
            }, function (err, info) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(info.response)
            });


            res.json({ 
                success: true,
                msg: 'Invitation sent!' 
            })
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[INV] Invitation Failed" });
        }
    }

}