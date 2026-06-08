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

export default {fetchTests, fetchTest, fetchAttemps}