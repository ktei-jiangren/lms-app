import React from "react";
import MainContent from "../common/MainContent";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import Course from "./Course";
import * as CourseAPI from "./CourseAPI";

class CourseList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: "",
      courses: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const courses = await CourseAPI.getCourses();
      this.setState({ courses, isLoading: false, error: "" });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading courses",
        isLoading: false
      });
    }
  }

  render() {
    return (
      <MainContent>
        <h1 className="title is-size-2 has-text-grey">Courses</h1>
        {this.state.error && (
          <Notification type="danger" closable>
            {this.state.error}
          </Notification>
        )}
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          !this.state.error && (
            <div className="columns">
              {this.state.courses.map(course => {
                return (
                  <div className="column is-one-third" key={course.id}>
                    <Course course={course} />
                  </div>
                );
              })}
            </div>
          )}
      </MainContent>
    );
  }
}

export default CourseList;
