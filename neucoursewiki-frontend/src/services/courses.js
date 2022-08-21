import axios from "axios";

class CourseDataService {
    getCourseById(id) {
        const data = {
            query: `query {
                getCourseById(course_id : "${id}") {
                  status
                  message
                  course {
                    course_id
                    name
                    introduction
                    timeline
                  }
                }
              }`
        }
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/course`, data);
    }
}

export default new CourseDataService();