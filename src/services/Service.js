import { client } from "./axiosClient";

export function Register(payLoad) {
  return client.post("/auth/signup", payLoad);
}

export function Signin(payLoad) {
  return client.post("/auth/signin", payLoad);
}
export function UploadFile(body) {
  return client.post("/auth/upload-doc", body);
}

export function addAbout(payLoad) {
  return client.post("/About/create", payLoad);
}
export function editAbout(id, payLoad) {
  return client.patch(`/About/update-record/${id}`, payLoad);
}
export function delteAbout(id) {
  return client.delete(`/About/delete-record/${id}`);
}

export function getAllAbout(payLoad) {
  return client.post("/About/search-record", payLoad);
}

export function addService(payLoad) {
  return client.post("/Service/create", payLoad);
}
export function editService(id, payLoad) {
  return client.patch(`/Service/update-record/${id}`, payLoad);
}
export function delteService(id) {
  return client.delete(`/Service/delete-record/${id}`);
}

export function getAllService(payLoad) {
  return client.post("/Service/search-record", payLoad);
}

export function addPortfolio(payLoad) {
  return client.post("/Portfolio/create", payLoad);
}
export function editPortfolio(id, payLoad) {
  return client.patch(`/Portfolio/update-record/${id}`, payLoad);
}
export function deltePortfolio(id) {
  return client.delete(`/Portfolio/delete-record/${id}`);
}

export function getAllPortfolio(payLoad) {
  return client.post("/Portfolio/search-record", payLoad);
}

export function addBlog(payLoad) {
  return client.post("/Blog/create", payLoad);
}
export function editBlog(id, payLoad) {
  return client.patch(`/Blog/update-record/${id}`, payLoad);
}
export function delteBlog(id) {
  return client.delete(`/Blog/delete-record/${id}`);
}

export function getAllBlog(payLoad) {
  return client.post("/Blog/search-record", payLoad);
}

export function addSkills(payLoad) {
  return client.post("/MySkills/create", payLoad);
}
export function editSkills(id, payLoad) {
  return client.patch(`/MySkills/update-record/${id}`, payLoad);
}
export function delteSkills(id) {
  return client.delete(`/MySkills/delete-record/${id}`);
}

export function getAllSkills(payLoad) {
  return client.post("/MySkills/search-record", payLoad);
}

export function addResume(payLoad) {
  return client.post("/Resume/create", payLoad);
}
export function editResume(id, payLoad) {
  return client.patch(`/Resume/update-record/${id}`, payLoad);
}
export function delteResume(id) {
  return client.delete(`/Resume/delete-record/${id}`);
}

export function getAllResume(payLoad) {
  return client.post("/Resume/search-record", payLoad);
}
