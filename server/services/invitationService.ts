import { Knex } from "knex";

export class InvitationService {
    constructor(private knex: Knex) { }

    async inviteUser(projectId: number, username: string) {
        
        const txn = await this.knex.transaction();

        try {
            const check = await txn("users").select("username").where("username", username).returning('*')[0];

            if(check){
                await txn('users').update({
                    token: '' //token
                }).where('users.id', check.id)
                return
            }

            const [{ userId }] = await txn.insert({
                username: username,
                password: '', 
                role: 'pending',
                token: '' //token
            }).into('users').returning('id as userId');

            await txn.insert({
                user_id: userId,
                project_id: projectId,
            }).into("members");
            
            await txn.commit();
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

}

