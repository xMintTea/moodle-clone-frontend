import api from "#/api.ts"

async function fetchAssignment(assignmentId:string) {
    return (await api.get(`/pages/${assignmentId}`)).data
}

async function fetchSubmissions(assignmentId: string, userId: number) {
  return (await api.get(`/pages/${assignmentId}/submissions`, {
    params: { user_id: userId }
  })).data
}

export default {fetchAssignment, fetchSubmissions}