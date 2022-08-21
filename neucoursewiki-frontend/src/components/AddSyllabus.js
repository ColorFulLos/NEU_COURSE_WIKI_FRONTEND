import { Form, Input, Modal } from 'antd';
import './AddSyllabus.css';


const { TextArea } = Input;
export default function AddSyllabus({seen, off}) {
    const [form] = Form.useForm();
   
  
    const submit = ()=>{
      form.submit()
    }
  
    const onSubmit = (values) =>{
      console.log(values)
      form.resetFields();
      off()
    }

    return (
        <div className='App'>
      <Modal 
          title="Add New Syllabus"
          visible={seen}
          width={450}
          okText="Submit"
          onCancel={off} 
          onOk={submit}
          style={{ borderRadius: "8px", overflow: "auto" }}
      >
        <div className="form">
          <Form form={form} layout='vertical' onFinish={onSubmit}>
          <Form.Item label="Your Syllabus" name="Content" rules={[{ required: true}]}>
                        <TextArea
                            placeholder="Please enter your new syllabus"
                            autoSize={{ minRows: 3, maxRows: 25 }}
                            allowClear
                        ></TextArea>
                    </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
    );
};
