// This page is the course page with a fixed background and side navigation
import React, { useState, useCallback,useEffect} from 'react';
import ProjectDataService from '../services/projects.js';
import { Cascader  } from 'antd';
import AddProjects from './AddProjects.js';
import ProjectCard from './ProjectCard'
import './Projects.css'
import "bootstrap/dist/css/bootstrap.min.css";
import InstructorsDataService from '../services/instructors.js';
import useSyncCallback from './useSyncCallback.js';
import ScrollButton from './ScrollButton.js';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";

const Projects = ({
    course
}) => {
  const [visible, setVisible] = useState(false);
  const [projects,setProjects]=useState([]);
  const [instructors,setInstructors] = useState([]);
  const [projectFilter, setProjectFilter] = useState([""]);
  const semesters = [ "Summer 2022","Spring 2022", "Fall 2021"];
  const course_id=course.course_id
  const courseName=course.name
  const [projectsToShow,setProjectsToShow] = useState([]);

  

    const open = () => {
        setVisible(true);
    };
    //关闭弹窗
    const close = () => {
        setVisible(false);
    };


const findProjects = useCallback( () => {
    
        if (projectFilter[0] === "" || projectFilter[0] === "All projects") {
            ProjectDataService.getProjectsByCourseId(course_id).then((res) => {
                setProjects(res.data.data.getProjectsByCourseId.projects);
                
            });
            
        } else if (projectFilter[0] === 'Semester') {
            ProjectDataService.getProjectsBySemester(course_id,projectFilter[1]).then((res) => {
                setProjects(res.data.data.getProjectsBySemester.projects);
                
            });
        } else {
            ProjectDataService.getProjectsByInstructor(course_id,projectFilter[1]).then((res) => {
                setProjects(res.data.data.getProjectsByInstructor.projects);
                
            });
        }
    }, [projectFilter]);

    const findInstructors = () =>{
        InstructorsDataService.getInstrutorsByCourseId(course_id).then((result)=>{
            setInstructors(result.data.data.getInstrutorsByCourseId.instructors)
        });
    };

    const InitialLoad = useSyncCallback(()=>{
    setProjectsToShow(projects.slice(0,3))
    })
    const onLoadMore = () => {
        let base = projectsToShow.length;
        let newResultArr = projects.slice(base, base + 3);
        setProjectsToShow([...projectsToShow, ...newResultArr]);
      };

useEffect(()=>{
    findProjects()
    findInstructors()
},[projectFilter,visible]);

useEffect(()=>{
    InitialLoad()
},[projects,projectFilter]);


const options = [
    {
        value: "All projects",
        label: "All projects"
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
                value: instructor.name,
                label: instructor.name
            }
        })
    }
]

    const renderProjectCard = useCallback((card) => {
        return (
            <ProjectCard
                instructor={card.instructor}
                semester={card.semester}
                description={card.description}
                link={card.link}
            />
        )
    })

   
   return (
        <div className='App row projectspage'>
            <div className='column left'>
                <div className='navigation'>
                    <Nav.Link as={Link} to={"/course#intro"}>Introduction</Nav.Link>
                    <Nav.Link as={Link} to={"/course#syllabus"}>Syllabus</Nav.Link>
                    <Nav.Link as={Link} to={"/course#review"}>Reviews</Nav.Link>
                    <Nav.Link as={Link} to={"/projects"}>Projects</Nav.Link>
                    
                </div>
            </div>
            <div className='column right'>
                <div className='header'></div>
                <div className='TitleBox'>
                    <h1>{course_id} {courseName}</h1>
                </div>
                <div className='ProjectBox'>
                    <h4>PROJECTS</h4>
                    
                    <div className='projectFilterBox'>
                        <Cascader
                            allowClear={false}
                            placeholder='Filter By'
                            options={options}
                            expandTrigger="hover"
                            onChange={setProjectFilter}
                        />
                    </div>

                    <button  type="primary" onClick={open} className='addProjectButton'>add projects</button>
                    <AddProjects
                        visible={visible}
                        close={close}
                        course_id={course_id}
                        instructor={instructors}
                        />
                    {
                        projectsToShow.map((project) => renderProjectCard(project))
                    }
                    { projectsToShow.length !== projects.length &&
                    <button className='loadmore' onClick={onLoadMore}>load more</button>}
                   <ScrollButton /> 
                </div>
            </div>
            
        </div>
        
    );
}

export default Projects;