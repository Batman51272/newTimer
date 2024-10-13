import React, { useState, useEffect } from "react";
import "./hero.css";
import Button from "react-bootstrap/Button"; // Correct Button import path
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./header.css";

export default function Hero() {
  let [now, setNow] = useState(new Date(0, 0, 0, 0, 25, 0));
  let [pomodoro, setPomodoro] = useState(true);
  let [shortBreak, setShortBreak] = useState(false);
  let [longBreak, setLongBreak] = useState(false);
  let [start, setStart] = useState(false);
  let [tasks, setTasks] = useState([]);
  let [input, setInput] = useState("");
  let [btnText, setBtnText] = useState("Start");
  let [showAbout, setShowAbout] = useState(false);
  let [showHome, setShowHome] = useState(true);

  useEffect(() => {
    setBtnText(start ? "Stop" : "Start");
  }, [start]);

  useEffect(() => {
    let newTime;
    if (pomodoro) {
      newTime = new Date(0, 0, 0, 0, 25, 0);
    } else if (shortBreak) {
      newTime = new Date(0, 0, 0, 0, 5, 0); // 5 minutes for short break
    } else {
      newTime = new Date(0, 0, 0, 0, 15, 0); // 15 minutes for long break
    }
    setNow(newTime);
  }, [pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    if (start) {
      const countDown = () => {
        if (now.getMinutes() === 0 && now.getSeconds() === 0) {
          setStart(false);
        } else {
          let newDate = new Date(now);
          newDate.setSeconds(newDate.getSeconds() - 1);
          setNow(newDate);
        }
      };
      let intervalId = setInterval(countDown, 1000);
      return () => clearInterval(intervalId);
    }
  }, [now, start]);

  const addTask = () => {
    if (input.trim()) {
      setTasks((prevTasks) => [...prevTasks, input]);
      setInput("");
    }
  };

  const handleKeyDown = function(event){
    if(event.key === 'Enter'){
      addTask();
    }
  }

  return (
    <div>
      {/* Navbar Section */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Pomodoro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as="button"
                onClick={() => {
                  setShowAbout(false);
                  setShowHome(true);
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as="button"
                onClick={() => {
                  setShowAbout(true);
                  setShowHome(false);
                }}
              >
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* About Us Section */}
      {showAbout ? (
        <div className="aboutSection">
          <Card>
            <Card.Header>About Us</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                I am a dedicated software engineer with a strong foundation in
                  modern web development and a passion for building scalable and
                  efficient applications. My expertise spans across front-end
                  and back-end technologies, including React.js and Django,
                  enabling me to develop full-stack solutions. With a deep
                  understanding of object-oriented programming (OOP) principles
                  and proficiency in languages like C++, Python, and JavaScript,
                  I craft well-structured, maintainable code. I am also
                  well-versed in Data Structures and Algorithms (DSA), which
                  allows me to solve complex problems efficiently and optimize
                  performance. I enjoy learning new technologies and applying
                  them to real-world projects, always aiming to deliver robust,
                  user-centered applications.
                </p>
                <footer className="blockquote-footer">
                  Student at{" "}
                  <cite title="Source Title">
                    National University of Computer and Emerging Sciences
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Contact Us</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  <b>Email:</b> naqvi1223aown@gmail.com
                  <hr />
                  <b>Github:</b>{" "}
                  <a href="https://github.com/Batman51272">Batman51272</a>
                </p>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          {/* Main Timer Section */}
          <div className="main">
            <div className="hero">
              <div className="hero-head">
                <button
                  className="pomo"
                  onClick={() => {
                    setShortBreak(false);
                    setLongBreak(false);
                    setPomodoro(true);
                  }}
                >
                  Pomodoro
                </button>
                <button
                  className="short-break"
                  onClick={() => {
                    setShortBreak(true);
                    setLongBreak(false);
                    setPomodoro(false);
                  }}
                >
                  Short Break
                </button>
                <button
                  className="long-break"
                  onClick={() => {
                    setShortBreak(false);
                    setLongBreak(true);
                    setPomodoro(false);
                  }}
                >
                  Long Break
                </button>
              </div>
              <div className="timer">
                <p>{`${now.getMinutes()} : ${now.getSeconds()}`}</p>
              </div>
              <Button variant="primary" onClick={() => setStart(!start)}>
                {btnText}
              </Button>
            </div>
          </div>

          {/* Task Input and List Section */}
          <div className="tasks">
            <input
              placeholder="Enter the task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={addTask}>
              Click Me
            </Button>
          </div>

          <div className="taskList">
            <ListGroup>
              {tasks.map((item, index) => (
                <ListGroup.Item as="li" key={index}>
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
}
