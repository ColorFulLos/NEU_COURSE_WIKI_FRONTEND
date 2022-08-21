import { BiHappy, BiTired } from "react-icons/bi";
import { RiThumbUpLine, RiThumbDownLine, RiStarLine, RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import {Button } from 'antd'
import { useEffect, useState } from "react";

import './ReviewCard.css'
import ReviewDataService from '../services/reviews.js';


const ReviewCard = ({
    reviewId, instructor, semester, 
    difficultiness, usefulness, 
    review, isRecommended, 
    upVotes, downVotes }) => {

        const getStars = (rating) => {
            let stars = [];
            for (let i = 0; i < rating; i++) {
                stars.push(<RiStarLine key={i}/>);
            }
            return stars;
        }

        const [newUpVotes, setNewUpVotes] = useState(upVotes);
        const [newDownVotes, setNewDownVotes] = useState(downVotes);
        const [voteUp, setVoteUp] = useState(false);
        const [voteDown, setVoteDown] = useState(false);
        const [voteChange, setVoteChange] = useState(false);

        // a user can only upvote or downvote, but not both together
        // double click can cancel
        const renderVoteDown = () => {
            if (voteDown) {
                setVoteDown(false);
                setNewDownVotes(newDownVotes-1);
            } else {
                setVoteDown(true);
                setNewDownVotes(newDownVotes+1);

                if (voteUp) {
                    setVoteUp(false);
                    setNewUpVotes(newUpVotes-1);
                }
            }
            setVoteChange(true);
        }

        const renderVoteUp = () => {
            if (voteUp) {
                setVoteUp(false);
                setNewUpVotes(newUpVotes-1);
            } else {
                setVoteUp(true);
                setNewUpVotes(newUpVotes+1);

                // if down is true, make it false
                // if down is false, keep it there
                if (voteDown) {
                    setVoteDown(false);
                    setNewDownVotes(newDownVotes-1);
                }

            }
            setVoteChange(true);
        }

        useEffect(() => {
            if (voteChange) {
                ReviewDataService.updateReviewByVotes(reviewId, newUpVotes, newDownVotes);
            }
            setVoteChange(false);
        },[voteChange]);

        return (
            <div className='ratingCard-review' key={reviewId}>
                <div className='ratingValues'>
                    <div className="ratingEmoji">
                        {isRecommended ? 
                            <BiHappy
                                color="rgb(105, 153, 225)"
                                size={100}
                            /> : 
                            <BiTired
                                color="gray"
                                size={100}
                            />
                        }
                        
                    </div>
                    
                </div>
                <div className='ratingInfo'>
                    <div className='ratingHeader'>
                        <div className='leftMost'>Instructor: {instructor}</div>
                        <div className='rightMost-review'>{semester}</div>
                    </div>
                    <div className="ratingSpecific">
                        <div className="ratingType">Difficulty: {getStars(difficultiness)}</div>
                        <div className="ratingType">Usefulness: {getStars(usefulness)}</div>
                    </div>
                    <div className='ratingContent-review'>
                        <div>{review}</div>
                    </div>
                    <div className="ratingFooter">
                        <Button className="ratingVote"  
                            type="text" 
                            icon={ !voteDown ? <RiThumbDownLine size={20} style={{marginRight:5}}/>
                            :
                            <RiThumbDownFill size={20} style={{marginRight:5}}/>
                            }
                            onClick={renderVoteDown}
                        > {newDownVotes}</Button>
                        <Button className="ratingVote" 
                            type="text" 
                            icon={ !voteUp ? <RiThumbUpLine size={20} style={{marginRight:5}}/>
                            :
                            <RiThumbUpFill size={20} style={{marginRight:5}}/>
                            }
                            onClick={renderVoteUp}
                            > {newUpVotes}</Button>
                    </div>
                </div>
            </div>
        );

};

export default ReviewCard;