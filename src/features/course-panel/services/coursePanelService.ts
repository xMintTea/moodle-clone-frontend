import api from "#/api";


async function fetchUsers(course_id: string | null, groupName: string | null = null) {
    return (await api.get(`users?course_id=${course_id}`)).data
}





export default {fetchUsers}