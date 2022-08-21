import React, { useState, useEffect, useCallback } from 'react';
import { Cascader, notification, Pagination } from 'antd';
import {Link} from "react-router-dom";
import ReviewDataService from '../services/reviews.js';
import InstructorsDataService from '../services/instructors.js';
import AddSyllabus from './AddSyllabus.js';
import Nav from 'react-bootstrap/Nav';
import ReviewCard from './ReviewCard'
import AddReview from './AddReviewModal.js';
import './Course.css'
import useSyncCallback from './useSyncCallback.js';

const Course = ({
    user,
    course
}) => {
    const course_id = course.course_id;
    const name = course.name;
    const introduction = course.introduction;
    const syllabus = course.timeline;


    // if course_id not exits, what to return?
    // if (course_id === null) {
    // }

    // For syllabus pop-up
    const [seen, setSeen] = useState(false);

    const on = () => {
        setSeen(true);
    };
    const off = () => {
        setSeen(false);
    };

    // for add review modal
    const [visible, setVisible] = useState(false);
    const [hasNewReview, setHasNewReview] = useState(false);

    const open = () => {
        if (user) {
            setVisible(true);
        } else {
            openNotification();
        }

    };
    const close = () => {
        setVisible(false);
    };


    const [reviews, setReviews] = useState([]);
    const semesters = ["2022 Summer", "2022 Spring", "2021 Fall"];
    const [instructors, setInstructors] = useState([]);
    const [reviewFilter, setReviewFilter] = useState([""]);

    // get movies whenever filter changes, first loaded, and add new review
    const getReviews = useSyncCallback(() => {
        let newReviews;
        console.log(course_id,"course_id")
        if (reviewFilter[0] === "" || reviewFilter[0] === "All reviews") {
            ReviewDataService.getReviews(course_id).then((res, err) => {
                newReviews = res.data.data.getReviewsByCourse.reviews.reviewsList;
                setReviews(newReviews);
            });

        } else if (reviewFilter[0] === 'Semester') {
            ReviewDataService.getReviewsBySemester(course_id, reviewFilter[1]).then((res, err) => {
                newReviews = res.data.data.getReviewsBySemester.reviews.reviewsList;
                setReviews(newReviews);
            });
        } else {
            ReviewDataService.getReviewsByInstructor(course_id, reviewFilter[1]).then((res, err) => {
                newReviews = res.data.data.getReviewsByInstructor.reviews.reviewsList;
                setReviews(newReviews);
            });
        }

        if (hasNewReview) {
            setHasNewReview(false);
        }

    }, [reviewFilter]);

    useEffect(() => {
        getReviews();
    }, [reviewFilter, hasNewReview,course_id]);

    // get instructors
    useEffect(() => {
        InstructorsDataService.getInstrutorsByCourseId(course_id).then((response) => {
            const result = response.data.data.getInstrutorsByCourseId.instructors;
            const newInstructors = result.map((instructor) => instructor.name);

            setInstructors(newInstructors);
        });
    }, []);

    // For cascader filters
    const options = [
        {
            value: "All reviews",
            label: "All reviews"
        }
        ,
        {
            value: "Semester",
            label: "Semester",
            children: semesters.map((semester) => {
                return {
                    value: semester,
                    label: semester
                }
            })
        },
        {
            value: "Instructor",
            label: "Instructor",
            children: instructors.map((instructor) => {
                return {
                    value: instructor,
                    label: instructor
                }
            })
        }
    ]

    const renderReviewCard = useCallback((card, index) => {
        return (
            <ReviewCard
                reviewId={card._id}
                instructor={card.instructor}
                semester={card.semester}
                difficultiness={card.rating_difficultiness}
                usefulness={card.rating_usefulness}
                review={card.content}
                isRecommended={card.isRecommended}
                upVotes={card.upVotes}
                downVotes={card.downVotes}
            />
        )
    })

    const openNotification = () => {
        notification.info({
            message: `Notification`,
            description: 'Log in first to add reviews',
            placement: 'topRight',
            top: 80,
            className: 'notificationBox',
            duration: 2
        });
    };

    // pagination
    const [currPage, setCurrPage] = useState(1);
    const pageSize = 5;

    const updatePage = (newPage) => {
        setCurrPage(newPage);
    }

    return (
        <div className='App row coursepage'>
            <div className='column left'>
                <div className='navigation'>
                    <a href="#intro">Introduction</a>
                    <a href='#syllabus'>Syllabus</a>
                    <a href='#review'>Reviews</a>
                    <Nav.Link as={Link} to={"/projects"}>Projects</Nav.Link>
                    
                </div>
            </div>
            <div className='column right'>
                {/* <div className='header'></div> */}
                <div className='TitleBox'>
                    <h1>{course_id}  {name}</h1>
                </div>

                <div className='IntroBox'>
                    <a id="intro"></a>
                    <h3>Introduction</h3>
                    <p>{introduction}</p>
                </div>

                <hr></hr>

                <div className='SyllabusBox'>
                    <a id="syllabus"></a>
                    <h3>Syllabus</h3>
                    <p>{syllabus}</p>
                    <button className='addSyllabusButton' onClick={on}>Request for edit</button>
                    <AddSyllabus
                        seen={seen}
                        off={off}
                    />
                </div>

                <hr></hr>

                <div className='CourseReviewBox'>
                    <a id="review"></a>
                    <h3>Reviews</h3>

                    <div className='filterBox'>
                        <Cascader
                            allowClear={false}
                            placeholder='Filter By'
                            options={options}
                            expandTrigger="hover"
                            onChange={setReviewFilter}
                            style={{ width: 200 }}
                        />
                    </div>

                    <button className='addReviewButton' onClick={open}>add reviews</button>
                    {user ?
                        <AddReview
                            visible={visible}
                            close={close}
                            user_id={user.googleId}
                            course_id={course_id}
                            setHasNewReview={setHasNewReview}

                        
                  instructors={instructors}

                        />
                        :
                        <div></div>
                    }
                    <div className='reviewCardBox'>
                        {

                            reviews.slice(pageSize * (currPage - 1), pageSize * currPage).map((review, index) => renderReviewCard(review, index))
                        }
                    </div>

                    <Pagination size="small" className='pagination' defaultPageSize={5} total={reviews.length} onChange={updatePage} />
                </div>

            </div>
        </div>
    );
}

export default Course;