import React from "react";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import * as LecturerAPI from "./LecturerAPI";

class LecturerList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      lecturers: [],
      error: ""
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const lecturers = await LecturerAPI.getLecturers();
      this.setState({ lecturers, isLoading: false, error: "" });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading lecturers",
        isLoading: false
      });
    }
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th style={{ width: 250 }}>Name</th>
          <th>Email</th>
          <th style={{ width: 150 }}>Staff number</th>
          <th style={{ width: 120 }} />
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.state.isLoading && (
          <tr>
            <td colSpan="6">
              <Loader />
            </td>
          </tr>
        )}
        {!this.state.isLoading &&
          this.state.lecturers.map(lecturer => (
            <tr key={lecturer.id}>
              <td>{lecturer.name}</td>
              <td>{lecturer.email}</td>
              <td>{lecturer.staffNumber}</td>
              <td style={{ textAlign: "right" }}>
                <Link to={`/lecturers/${lecturer.id}`}>Details</Link>
              </td>
            </tr>
          ))}
      </tbody>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title is-size-2 has-text-grey">Lecturers</h1>
        <Link
          className="button is-primary"
          to="lecturers/create"
          style={{ marginBottom: 20 }}
        >
          Add new lecturer
        </Link>
        {this.state.error && (
          <Notification type="danger" closable>
            {this.state.error}
          </Notification>
        )}
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          !this.state.error && (
            <div>
              <table className="table" style={{ width: "100%" }}>
                {this.renderHead()}
                {this.renderBody()}
              </table>
            </div>
          )}
      </MainContent>
    );
  }
}

export default LecturerList;
