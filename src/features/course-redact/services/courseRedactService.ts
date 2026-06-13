import api from "#/api.ts";


async function createSection(data: {
  title: string;
  description: string;
  order: number;
  visibility: number;
  course_id: number;
}) {
  const res = await api.post("sections/", data);
  return res.data;
}

async function updateSection(sectionId: number, data: {
  title: string;
  description: string;
  order: number;
  visibility: number;
  course_id: number;
}) {
  const res = await api.put(`sections/${sectionId}`, data);
  return res.data;
}


async function createPage(data: {
  title: string;
  description: string;
  comment: string;
  order: number;
  visibility: number;
  due_date: string;
  section_id: number;
}) {
  const res = await api.post("pages", data);
  return res.data;
}

async function updatePage(pageId: number, data: {
  title: string;
  description: string;
  comment: string;
  order: number;
  visibility: number;
  due_date: string;
  section_id: number;
}) {
  const res = await api.put(`pages/${pageId}`, data);
  return res.data;
}


async function createTest(data: {
  title: string;
  description: string;
  due_date: string;
  order: number;
  visibility: number;
  content: any[];
  max_attempts: number;
  section_id: number;
}) {
  const res = await api.post("/tests/", data);
  return res.data;
}

async function updateTest(testId: number, data: any) {
  const res = await api.put(`tests/${testId}`, data);
  return res.data;
}


async function createVideo(data: {
  title: string;
  description: string;
  order: number;
  visibility: number;
  video_url: string;
  section_id: number;
}) {
  const res = await api.post("videos/", data);
  return res.data;
}

async function updateVideo(videoId: number, data: any) {
  const res = await api.put(`videos/${videoId}`, data);
  return res.data;
}


async function createResource(data: {
  title: string;
  description: string;
  order: number;
  visibility: number;
  section_id: number;
  file_id: number;
}) {
  const res = await api.post("resources/", data);
  return res.data;
}

async function updateResource(resourceId: number, data: any) {
  const res = await api.put(`resources/${resourceId}`, data);
  return res.data;
}

export default {
  createSection,
  updateSection,
  createPage,
  updatePage,
  createTest,
  updateTest,
  createVideo,
  updateVideo,
  createResource,
  updateResource,
};