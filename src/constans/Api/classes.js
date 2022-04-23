import axios from "../../configs/axios";

export default {
  all: () => axios.get("/courses").then(res => res),
  detail: (id) => axios.get(`/courses/detail/${id}`).then(res => res)
};
