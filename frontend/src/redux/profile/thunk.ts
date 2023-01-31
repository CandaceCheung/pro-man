import { AppDispatch } from '../../store';
import { MakeRequest } from '../../utils/requestUtils';
import { ProfileState, setInfoAction, updateInfoAction } from './slice';

const token = localStorage.getItem('token');
const makeRequest = new MakeRequest(token!);

export function getProfile(userId: number) {
    return async (dispatch: AppDispatch) => {
        const result = await makeRequest.get<{
            success?: boolean;
            data?: ProfileState;
            msg?: string;
        }>(`/profile/${userId}`);

        if (result.success) {
            dispatch(setInfoAction(result.data!));
        } else {
            console.log('Get profile info fail');
        }
    };
}

export function putProfileInfo(putInfo: { firstName?: string; lastName?: string; password?: string }) {
    return async (dispatch: AppDispatch) => {
        const data = await makeRequest.put<
            {
                putInfo: { firstName?: string; lastName?: string; password?: string };
            },
            {
                success?: boolean;
                result?: { firstName: string; lastName: string };
                msg: string;
            }
        >(`/profile/update`, {
            putInfo
        });

        if (data.success) {
            dispatch(updateInfoAction(data.result!));
        } else {
            console.log('Update Profile info fail');
        }
    };
}
