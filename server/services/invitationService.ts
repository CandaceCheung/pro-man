import { Knex } from "knex";
export class InvitationService {
    constructor(private knex: Knex) { }

    async inviteUser(projectId: number, userId: number, email: string) {
        
        const txn = await this.knex.transaction();

        try {
            const [check] = await txn("invitations")
                .select("*")
                .where("user_id", userId)
                .where("email", email)
                .where("project_id", projectId);

            if(check){
                return check
            }

            const [invitation] = await txn.insert({
                user_id: userId,
                project_id: projectId,
                email: email,
                status: 'pending',
            }).into('invitations').returning('*');

            await txn.commit();
            return invitation

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async acceptInvite(invitationId :number, projectId: number, userId:number) {
        
        const txn = await this.knex.transaction();

        try {

            const [invitation] = await txn('invitations').update({
                status: 'accepted'
            }).where('id', invitationId).returning('*')
            
            await txn('members').insert({
                user_id: userId,
                project_id: projectId,
            })

            await txn.commit();
            return invitation
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }
}

