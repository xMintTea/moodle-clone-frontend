import api from "#/api";


async function fetchVideos(courseId: string | null) {
    return (await api.get(`videos/?course_id=${courseId}`)).data
}


export default {fetchVideos}