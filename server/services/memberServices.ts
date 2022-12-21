import { Knex } from "knex";

export class MemberService {
    constructor(private knex: Knex) { }

    async getMemberList(userId: number) {

        const txn = await this.knex.transaction();

        try {
            const memberList = await txn.select(
                'members.id as membership_id',
                'members.avatar',
                'users.id as member_id',
                'users.last_name',
                'users.first_name',
                'users.username',
                txn.raw('array_agg(projects.name) as project_name'),
                txn.raw('array_agg(projects.id) as project_id')
            )
                .from('projects')
                .where("creator_id", userId)
                .join('members', 'projects.id', 'members.project_id')
                .join('users', 'members.user_id', 'users.id')
                .groupBy('members.id')
                .groupBy('users.id')

            await txn.commit();
            return memberList

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    
    async changeAvatar(membershipId: number, avatar: number) {

        const txn = await this.knex.transaction();

        try {
            const [member] = await txn('members')
                .update({
                    avatar
                })
                .where("id", membershipId).returning('*')

            await txn.commit();
            return member

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }
    
}

