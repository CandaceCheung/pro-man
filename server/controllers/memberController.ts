import { Request, Response } from "express";
import { tableService } from "../app";
import { MemberService } from '../services/memberServices';

export class MemberController {
    constructor(private memberService: MemberService) { }

    acceptInvitationThroughMember = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId
            const projectId = req.body.projectId

            const check = await this.memberService.checkMember(projectId, userId)
            if (check) {
                res.json({
                    success: false,
                    msg: 'You are a member of this project already',
                })
            } else {
                const member = await this.memberService.createMember(projectId, userId)
                if (member) {
                    const tableList = await tableService.getTableList(userId)
                    res.json({
                        success: true,
                        msg: 'Joined Project Successfully',
                        member,
                        tableList
                    })
                } else {
                    res.json({
                        success: false,
                        msg: 'Something went wrong during creating membership',
                    })
                }
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Something Went wrong during reading Database" });
        }
    }

    getMemberList = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId
            const memberList = await this.memberService.getMemberList(parseInt(userId))
            if (memberList.length > 0) {
                res.json({
                    success: true,
                    msg: 'Member List Retrieved Successfully',
                    memberList
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Member List Retrieval Failed',
                })
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Something Went wrong during reading Database" });
        }
    }

    changeAvatar = async (req: Request, res: Response) => {
        try {
            const membershipId = req.body.membershipId
            const avatar = req.body.avatar
            await this.memberService.changeAvatar(membershipId, avatar)

            res.json({
                success: true,
                msg: 'Avatar changed Successfully',

            })
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Something Went wrong during reading Database" });
        }
    }

}