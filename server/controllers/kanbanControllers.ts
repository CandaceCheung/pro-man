import { Request, Response } from 'express';
import { KanbanService } from '../services/kanbanService';

export class KanbanController {
	constructor(private kanbanService: KanbanService) {}

	getKanban = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getKanbanInfo(Number(projectId));

			res.json({
				success: true,
				projectInfo: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN01] Fail to Get Data.' });
		}
	};

	getMemberList = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getMemberList(Number(projectId));

			res.json({
				success: true,
				memberList: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: '[KAN02] Fail to Get Member List Data.'
			});
		}
	};

	getGroupList = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getGroupList(Number(projectId));

			res.json({
				success: true,
				groupList: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: '[KAN03] Fail to Get Group List Data.'
			});
		}
	};

	postKanban = async (req: Request, res: Response) => {
		try {
			const { projectId, stateId, userId, itemName, memberName, memberId, date, groupId } = req.body;
			const itemId = await this.kanbanService.addKanbanitem(projectId, stateId, userId, itemName, memberName, memberId, date, groupId);

			res.json({
				success: true,
				itemId
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN04] Fail to Post Data.' });
		}
	};

	putKanbanOrder = async (req: Request, res: Response) => {
		try {
			const { order } = req.body;

			await this.kanbanService.reorderKanban(order);

			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN05] Fail to Put Order.' });
		}
	};
}
