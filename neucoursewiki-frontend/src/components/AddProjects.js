import { Button, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import ProjectDataService from '../services/projects.js';

export default function AddProjects({visible, close, course_id, instructor}) {
  const [form] = Form.useForm();
 

  const submit = ()=>{
    form.submit()
  }

  const onSubmit = (values) =>{
    ProjectDataService.postProjects(values.course_id,values.description,values.link,values.instructor,values.semester)
    form.resetFields();
    close()
  }

  const courses = [course_id]

  const semesters = ["Fall 2021", "Spring 2022", "Summer 2022"];

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
              label="course_id"
              name="course_id"
              rules={[{ required: true}]}
            >
              <Select placeholder='Please enter the course_id for this project' >
                            {
                                courses.map((course) => {
                                    return <Select.Option value={course}>{course}</Select.Option>
                                })
                            }
                        </Select>
              
            </Form.Item>
            <Form.Item
              label="instructor"
              name="instructor"
              rules={[{ required: true}]}
            >
              <Select placeholder='Please enter the instructor for this project' >
                            {
                                instructor.map((instructor) => {
                                    return <Select.Option value={instructor.name}>{instructor.name}</Select.Option>
                                })
                            }
                        </Select>
              
            </Form.Item>
            <Form.Item
              label="description"
              name="description"
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="link"
              name="link"
              rules={[{ required: true, message: 'Please input Github link!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                        label="Semester"
                        name="semester"
                        rules={[{ required: true}]}
                        >
                        <Select placeholder='Please enter the semester' >
                            {
                                semesters.map((semester) => {
                                    return <Select.Option value={semester}>{semester}</Select.Option>
                                })
                            }
                        </Select>
                        </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
