
import './ProjectCard.css'

const ProjectCard = ({
    instructor,
    semester,
    description,
    link
}) => {
        
return (
            <div className='ratingCard-review'>
                <div className='ratingInfo'>
                <div className='ratingHeader'>
                    <div className='leftMost'>Instructor:{instructor}</div>
                    <div className='rightMost'>Semester:{semester}</div>
                </div>
                
                <div className='ratingContent'>
                    <div>{description}</div>
                    <a href={link} target="_blank" rel="noopener noreferrer" >{link}</a>
                </div>
                </div>
                
            </div>
        );

};

export default ProjectCard;