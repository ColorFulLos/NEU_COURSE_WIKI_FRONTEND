import axios from 'axios'; 

class ReviewDataService {

    // get reviews for a course
    getReviews(course_id) {
        const data =  {query: 
            `query {
                getReviewsByCourse(course_id: "${course_id}") {
                reviews {
                    reviewsList{
                        _id
                        instructor
                        semester
                        rating_difficultiness
                        rating_usefulness
                        content
                        isRecommended
                        upVotes
                        downVotes
                    }
                }
            }
          }
        `};
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/review`, data);
    }

    // update reviews' upvotes and downvotes
    updateReviewByVotes(review_id, upVotes, downVotes) {
        const data = {
            query: 
            `mutation {
                updateReviewVotes(review_id: "${review_id}", upVotes: ${upVotes}, downVotes: ${downVotes}) {
                  status
                  message
                }
              }`
        }
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/review`, data);
    }

    // add review
    addReview(input) {
        const data = {
            query: 
            `mutation {
                addReview(input: {
                    user_id: "${input.user_id}",
                    course_id:"${input.course_id}",
                    content: "${input.content}",
                    difficultiness: ${input.difficultiness},
                    usefulness: ${input.usefulness},
                    semester:  "${input.semester}",
                    instructor:  "${input.instructor}",
                    isRecommended:  ${input.isRecommended}
                }) {
                  status
                  message
                }
              }`
        }
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/review`, data);
    }

    // delete reviews - 不着急

    // In a course, get reviews by semester
    getReviewsBySemester(course_id, semester) {
        const data =  {query: 
            `query {
                getReviewsBySemester(course_id: "${course_id}", semester: "${semester}") {
                reviews {
                    reviewsList{
                        _id
                        instructor
                        semester
                        rating_difficultiness
                        rating_usefulness
                        content
                        isRecommended
                        upVotes
                        downVotes
                    }
                }
            }
          }
        `};
        
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/review`, data);
    }

    // In a course, get reviews by instrutor
    getReviewsByInstructor(course_id, instructor) {
        const data =  {query: 
            `query {
                getReviewsByInstructor(course_id: "${course_id}", instructor: "${instructor}") {
                reviews {
                    reviewsList{
                        _id
                        instructor
                        semester
                        rating_difficultiness
                        rating_usefulness
                        content
                        isRecommended
                        upVotes
                        downVotes
                    }
                }
            }
          }
        `};
        
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/review`, data);
    }
}

export default new ReviewDataService();