import { Modal } from 'antd';


export default function CourseNotFound({ seen, off }) {
    return (
        <div className='App'>
            <Modal
                visible={seen}
                width={450}
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={off}
                style={{ borderRadius: "8px", overflow: "auto" }}
            >
                <div className="form">
                    <h2>Course Not Found</h2>
                    <p>Please enter a valid course Id in the correct format(eg: CS5610)</p>
                </div>
            </Modal>
        </div>
    );
};
