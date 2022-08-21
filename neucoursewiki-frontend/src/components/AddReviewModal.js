import { Button, Form, Input, Modal, Select } from 'antd';
import { RadioChangeEvent } from 'antd';
import { Radio, Rate } from 'antd';
import { useState } from 'react';

import ReviewDataService from '../services/reviews.js';

import "antd/dist/antd.css";
import './AddReviewModal.css'

const { TextArea } = Input;

export default function AddReview({visible, close, user_id, course_id, setHasNewReview, instructors}) {

    const [ratingDiff, setRatingDiff] = useState(0);
    const [ratingUse, setRatingUse] = useState(0);
    const [form] = Form.useForm();
    //click ok to submit form
    const submit = ()=>{
        // This function will call below onSubmit function
        form.submit();
    }
    
    const onSubmit = (values) =>{
        // user id has to be string
        ReviewDataService.addReview({
            user_id: user_id,
            course_id: course_id,
            content: values.reviewContent,
            instructor: values.instructor,
            semester: values.semester,
            difficultiness: ratingDiff,
            usefulness: ratingUse,
            isRecommended: values.recommendation
        }).then(
            res => {
                //console.log(res);
                setHasNewReview(true);
            }
            );
        form.resetFields();
        close()
    }
    

    // mock instructor data
    // const instructors = ["Tony Mullen", "Anthony Jackson"];

    // semester data
    const semesters = ["2021 Fall", "2022 Summer", "2022 Spring"];

    // rating 
    const desc = ["新手友好","可选","中规中矩","有点难度","千万别选"];

    // rating for usefulness
    const descUse = ["没学到啥","中规中矩","中规中矩","中规中矩","利于找工"];

    return (
        <div className='App'>
            <Modal
                title="Add New Review"
                visible={visible}
                width={450}
                okText="Submit"
                onCancel={close} 
                onOk={submit}
                style={{ borderRadius: "8px", overflow: "auto" }}
            >
            <div className="form">
                <Form form={form} layout='vertical' onFinish={onSubmit}>
                    <Form.Item
                        label="Would you recommend this course?"
                        name="recommendation"
                        rules={[{ required: true}]}
                        >
                        <Radio.Group>
                            <Radio className='radioButton' value={1}>Yes</Radio>
                            <Radio className='radioButton' value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Instructor"
                        name="instructor"
                        rules={[{ required: true}]}
                        >
                        <Select placeholder='Please enter the instructor for this course' >
                            {
                                instructors.map((instructor) => {
                                    return <Select.Option key={instructor} value={instructor}>{instructor}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Semester"
                        name="semester"
                        rules={[{ required: true}]}
                        >
                        <Select placeholder='Please enter the semester you take this course' >
                            {
                                semesters.map((semester, i) => {
                                    return <Select.Option key={i} value={semester}>{semester}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Difficulty" >
                        <Rate tooltips={desc} value={ratingDiff} onChange={setRatingDiff}/>
                        {ratingDiff ? <span className="ant-rate-text">{desc[ratingDiff - 1]}</span> : ''}
                    </Form.Item>
                    <Form.Item label="Usefulness" >
                        <Rate tooltips={descUse} value={ratingUse} onChange={setRatingUse}/>
                        {ratingUse ? <span className="ant-rate-text">{descUse[ratingUse - 1]}</span> : ''}
                    </Form.Item>
                    <Form.Item label="Your review" name="reviewContent" rules={[{ required: true}]}>
                        <TextArea
                            placeholder="Please leave your thoughts for future students~"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            allowClear
                        ></TextArea>
                    </Form.Item>
                </Form>
                </div>
            </Modal>
            
        </div>
        
    )
}