import api from "#/api.ts"

async function fetchTests() {
    return (await api.get("/tests")).data
}

async function fetchTest(testId : string) {
    return (await api.get(`/tests/${testId}`)).data
}

async function fetchAttemps(testId:string, userId: string | null) {
    return (await api.get(`/tests/${testId}/attempts?user_id=${userId}`)).data
}

async function fetchAttempsCourse(userId: string, courseId: string) {
    return (await api.get(`/tests/attempts/${userId}?course_id=${courseId}`)).data
}

async function submitAttempt(testId: string, payload: {
  end_time: string;
  answers: any[];
}) {
  return (await api.post(`tests/${testId}/attempts/`, payload)).data
}


export default {fetchTests, fetchTest, fetchAttemps, submitAttempt, fetchAttempsCourse}