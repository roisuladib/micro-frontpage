import axios from "../../configs/axios";

export default {
  all: (options = { params: { status: "published" } }) => axios.get("/courses", options).then(res => res),
  detail: (id) => axios.get(`/courses/detail/${id}`).then(res => res)
}
