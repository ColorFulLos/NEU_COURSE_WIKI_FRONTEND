import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Home from "./components/Home.js";
import Course from "./components/Course.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavItem, Nav, InputGroup } from 'react-bootstrap';
import Login from "./components/Login";
import Logout from "./components/Logout";
import Projects from './components/Projects.js';
import CourseDataService from "./services/courses.js";
import CourseNotFound from './components/CourseNotFound.js';


import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
function App() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const location = useLocation();

  //searchbyid
  const [searchCourseId, setSearchId] = useState("");
  let navigate = useNavigate();

  const [seen, setSeen] = useState(false);
  const on = () => {
    setSeen(true);
  };
  const off = () => {
    setSeen(false);
  };

  const findById = useCallback(() => {
    CourseDataService.getCourseById(searchCourseId).then((result) => {
      if (result.data.data.getCourseById.course !== null) {
        setCourse(result.data.data.getCourseById.course);
        navigate("/course", {replace: false});
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

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now() / 1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, [])

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={location.pathname == "/" ? "App Homepage" : "App"}>
        <Navbar expand="lg" sticky="top" variant="dark">
          <Container className="container-fluid">
            <Navbar.Brand className="brand" href="/">
              NEU COURSE WIKI
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="ms-auto">
                {location.pathname != "/" &&
                  <NavItem className='SearchBox'>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Search Course ID"
                        aria-label="Course ID"
                        aria-describedby="basic-addon2"
                        value={searchCourseId}
                        onChange={onChangeSearchId}
                        onKeyPress={handleKeyPress}
                      />
                      <Button variant="primary" id="button-addon2" onClick={findById}>
                        Go!
                      </Button>
                    </InputGroup>
                  </NavItem>
                }
                <NavItem>
                  {user ? (
                    <Logout setUser={setUser} />
                  ) : (
                    <Login setUser={setUser} />
                  )}
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path={"/"} element={
            <Home
              setCourse={setCourse} />}
          />
          <Route exact path={"/course"} element={
            <Course
              // user={{user_id:1234}}
              user={user}
              // course = {{course_id:"CS5610"}}
              course={course}
            />}
          />
          <Route exact path={"/projects"} element={
            <Projects
              course={course} />}
          />
        </Routes>
        <CourseNotFound
          seen={seen}
          off={off}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
