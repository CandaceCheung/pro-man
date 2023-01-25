import { Request, Response } from 'express';
import { tableService } from '../app';
import { MemberService } from '../services/memberServices';
import { keysToCamel } from '../utils/camelCase';

export class MemberController {
	constructor(private memberService: MemberService) {}

	acceptInvitationThroughMember = async (req: Request, res: Response) => {
		try {
			const userId = req.body.userId;
			const projectId = req.body.projectId;

			const check = await this.memberService.checkMember(
				projectId,
				userId
			);
			if (check.member) {
				res.json({
					success: false,
					msg: 'You are a member of this project already'
				});
			} else if (check.project.is_deleted) {
				res.json({
					success: false,
					msg: 'Target project no longer exist'
				});
			} else {
				const member = await this.memberService.createMember(
					projectId,
					userId
				);
				if (member) {
					const tableList = await tableService.getTableList(userId);
					res.json({
						success: true,
						msg: 'Joined Project Successfully',
						member,
						tableList
					});
				} else {
					res.json({
						success: false,
						msg: 'Something went wrong during creating membership'
					});
				}
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during reading Database'
			});
		}
	};

	deleteMember = async (req: Request, res: Response) => {
		try {
			const membershipId = req.params.membershipId;
			const member = await this.memberService.getMember(
				parseInt(membershipId)
			);
			if (member) {
				const check = await this.memberService.checkLinkage(
					member.project_id,
					member.user_id
				);
				if (check) {
					res.json({
						success: false,
						msg: 'Unable to remove member, please make sure there is no tasks assigned to this member and try again'
					});
				} else {
					await this.memberService.deleteMember(
						parseInt(membershipId)
					);
					res.json({
						success: true,
						msg: 'Member deleted',
						projectId: member.project_id
					});
				}
			} else {
				res.json({
					success: false,
					msg: 'Membership not existed'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during reading Database'
			});
		}
	};

	getMemberList = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const memberList = await this.memberService.getMemberList(
				parseInt(userId)
			);
			if (memberList.length > 0) {
				res.json({
					success: true,
					msg: 'Member List Retrieved Successfully',
					memberList: keysToCamel(memberList)
				});
			} else {
				res.json({
					success: false,
					msg: 'Member List Retrieval Failed'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during reading Database'
			});
		}
	};

	changeAvatar = async (req: Request, res: Response) => {
		try {
			const membershipId = req.body.membershipId;
			const avatar = req.body.avatar;
			await this.memberService.changeAvatar(membershipId, avatar);

			res.json({
				success: true,
				msg: 'Avatar changed Successfully'
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during reading Database'
			});
		}
	};
}
