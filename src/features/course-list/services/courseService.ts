import api from "#/api.ts"

async function fetchCourses() {
    return (await api.get("/courses")).data
}

async function fetchCourse(coureId : string) {
    return (await api.get(`/courses/${coureId}`)).data
}

export default {fetchCourses, fetchCourse}