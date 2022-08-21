import axios from "axios";
class InstructorsDataService {
    
   

    getInstrutorsByCourseId(id){
      const data = {
        query: `query {
            getInstrutorsByCourseId(course_id : "${id}") {
              status
              message
              instructors{
                name,
                courses
              }
            }
          }`
    }
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/instructors`, data);
    
    }

    
}

export default new InstructorsDataService();