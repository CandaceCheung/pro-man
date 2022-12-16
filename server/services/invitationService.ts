import { Knex } from "knex";

export class InvitationService {
    constructor(private knex: Knex) { }

    async inviteUser(projectId: number, username: string) {
        
        const txn = await this.knex.transaction();

        try {
            const check = await txn("users").select("*").where("username", username);

            if(check){
                delete check[0].password
                return check[0]
            }

            const [tempUser] = await txn.insert({
                username: username,
                password: '',
                first_name: '',
                last_name: '',
                role: 'pending',
            }).into('users').returning('*');

            console.log(tempUser)
            await txn.insert({
                user_id: tempUser.id,
                project_id: projectId,
                status: 'pending'
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

