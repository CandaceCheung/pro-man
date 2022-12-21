import { Request, Response } from "express";
import { MemberService } from '../services/memberServices';

export class MemberController {
    constructor(private memberService: MemberService) { }

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
            const member = await this.memberService.changeAvatar(membershipId, avatar)
            if (member) {
                res.json({
                    success: true,
                    msg: 'Avatar changed Successfully',
                    membershipId: member.id,
                    avatar: member.avatar
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Avatar change Failed',
                })
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Something Went wrong during reading Database" });
        }
    }

}