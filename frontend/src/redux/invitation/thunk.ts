import { Dispatch } from "@reduxjs/toolkit";
import { showNotification } from '@mantine/notifications';
import { sendInviteAction } from "./slice";

export function sendInvitation(projectId: number, username: string) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/invitation`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId,
                username
			})
		});
		const result = await res.json();

		if (result.success) {
			dispatch(sendInviteAction(result.invitationList))
			showNotification({
				title: 'Invitation notification',
				message: 'Invitation Sent'
			});
		} else {
			showNotification({
				title: 'Invitation notification',
				message: 'Invitation Failed'
			});
		}
	};
}