import axios from "axios";
class ProjectDataService {
    
   

    getProjectsByCourseId(id){
      const data = {
        query: `query {
          getProjectsByCourseId(course_id : "${id}") {
              status
              message
              projects{
                description,
                instructor,
                semester,
                link
              }
            }
          }`
    }
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects`, data);
    
    }

    postProjects(course_id,description,link,instructor,semester){
      const data = {
        query: `mutation {
          addProject(input:{course_id:"${course_id}",description:"${description}",link:"${link}",instructor:"${instructor}",semester:"${semester}"}) {
              status
              message
              
            }
          }`
    }
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects`, data);
    
    }

    getProjectsByInstructor(course_id, instructor) {
      const data =  {query: 
          `query {
            getProjectsByInstructor(course_id: "${course_id}", instructor: "${instructor}") {
              projects{
                description,
               instructor,
               semester,
               link
              }
          }
        }
      `};
      
      return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects`, data);
  }

  
  getProjectsBySemester(course_id, semester) {
    const data =  {query: 
        `query {
          getProjectsBySemester(course_id: "${course_id}", semester: "${semester}") {
            projects{
              description,
             instructor,
             semester,
             link
            }
        }
      }
    `};
    
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects`, data);
}



    
}

export default new ProjectDataService();