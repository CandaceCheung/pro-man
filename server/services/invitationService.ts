import { Knex } from "knex";

export class InvitationService {
    constructor(private knex: Knex) { }

    async inviteUser(projectId: number, username: string) {
        
        const txn = await this.knex.transaction();

        try {
            const check = await txn("users").select("username").where("username", username).returning('*')[0];

            if(check){
                delete check.password
                return check
            }

            const tempUser = await txn.insert({
                username: username,
                password: '',
                first_name: '',
                last_name: '',
                role: 'pending',
            }).into('users').returning('*')[0];

            await txn.insert({
                user_id: tempUser.id,
                project_id: projectId,
            }).into("members");
            
            await txn.commit();
            delete tempUser.password
            return tempUser

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

}

