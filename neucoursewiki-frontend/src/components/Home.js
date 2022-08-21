import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CourseNotFound from './CourseNotFound.js';
import CourseDataService from "../services/courses";
import "./Home.css";

const Home = ({
    setCourse
}) => {

    const [seen, setSeen] = useState(false);
    const on = () => {
        setSeen(true);
    };
    const off = () => {
        setSeen(false);
    };

    const [searchCourseId, setSearchId] = useState("");
    let navigate = useNavigate();

    const findById = useCallback(() => {
        CourseDataService.getCourseById(searchCourseId).then((result) => {
            if (result.data.data.getCourseById.course !== null) {
                setCourse(result.data.data.getCourseById.course);
                navigate("/course", { replace: false });
            } else {
                on();
            }

        });
    }, [searchCourseId]);

    const onChangeSearchId = e => {
        const searchCourseId = e.target.value;
        setSearchId(searchCourseId);
    }

    const handleKeyPress = e => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            e.preventDefault();
            findById();
        }
    };



    return (
        <div>
            <div className="Title">
                NEU COURSE WIKI
            </div>
            <div className="Search d-flex justify-content-center">
                <Form >
                    <Row style={{ width: "100%" }}>
                        <Col className="col-10">
                            <Form.Group className="mb-3">
                                <Form.Control
                                    className="box"
                                    type="text"
                                    placeholder="Search Course ID (CS5610)"
                                    value={searchCourseId}
                                    onChange={onChangeSearchId}
                                    onKeyPress={handleKeyPress}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="col-2">
                            <Button
                                className="box"
                                variant="primary"
                                type="button"
                                onClick={findById}
                            >
                                Search
                            </Button>

                        </Col>
                    </Row>
                </Form>
                <CourseNotFound
                    seen={seen}
                    off={off}
                />
            </div>

        </div>
    )
}
export default Home;

