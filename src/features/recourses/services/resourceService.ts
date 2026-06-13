import api from "#/api";


async function fetchResource(resourceId: string) {
    return (await api.get(`/resources/${resourceId}`)).data
}

async function fetchFile(fileId: string) {
    return (await api.get(`http://127.0.0.1:8000/v1/files/${fileId}/stream`)).data
}




export default {fetchResource}