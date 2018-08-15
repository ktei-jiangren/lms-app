import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import classnames from "classnames";
import { range } from "lodash/util";
import MainContent from "../common/MainContent";
import Notification from "../common/Notification";
import Loader from "../common/Loader";
import * as StudentAPI from "./StudentAPI";

class StudentList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      students: [],
      currentPage: 1,
      totalPage: 1,
      isLoadingPage: false
    };
  }

  fetchStudentsByPage = async pageNumber => {
    this.setState({ currentPage: pageNumber, isLoadingPage: true });

    try {
      const data = await StudentAPI.getStudents(pageNumber);
      this.setState({
        students: data.students,
        totalPage: data.totalPage,
        isLoadingPage: false,
        isLoading: false,
        error: ""
      });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading students",
        isLoading: false,
        isLoadingPage: false
      });
    }
  };

  async componentDidMount() {
    await this.fetchStudentsByPage(1);
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th style={{ width: 300 }}>Email</th>
          <th style={{ width: 70 }}>Gender</th>
          <th style={{ width: 150 }}>Date of birth</th>
          <th style={{ width: 70 }}>Credit</th>
          <th style={{ width: 120 }} />
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.state.isLoadingPage && (
          <tr>
            <td colSpan="6">
              <Loader />
            </td>
          </tr>
        )}
        {!this.state.isLoadingPage &&
          this.state.students.map(student => (
            <tr>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{moment(student.dateOfBirth).format("MMM DD YYYY")}</td>
              <td>{student.credit}</td>
              <td style={{ textAlign: "right" }}>
                <Link to={`/students/${student.id}`}>Details</Link>
              </td>
            </tr>
          ))}
      </tbody>
    );
  }

  renderPages() {
    const { totalPage, currentPage } = this.state;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;

    let pageNumbers = [];
    if (totalPage < 3) {
      pageNumbers = range(1, totalPage + 1);
    } else {
      if (currentPage === 1) {
        pageNumbers = [1, 2, 3];
      } else if (currentPage === totalPage) {
        pageNumbers = [totalPage - 2, totalPage - 1, totalPage];
      } else {
        pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
      }
    }

    return (
      <nav
        className="pagination is-right"
        role="navigation"
        aria-label="pagination"
        style={{ marginBottom: 20 }}
      >
        {hasPrev && (
          <a
            className="pagination-previous"
            onClick={this.fetchStudentsByPage.bind(this, currentPage - 1)}
          >
            Previous
          </a>
        )}

        {hasNext && (
          <a
            className="pagination-next"
            onClick={this.fetchStudentsByPage.bind(this, currentPage + 1)}
          >
            Next page
          </a>
        )}

        <ul className="pagination-list">
          {pageNumbers.map(pageNumber => (
            <a
              key={pageNumber}
              className={classnames("pagination-link", {
                "is-current": currentPage === pageNumber
              })}
              onClick={
                currentPage === pageNumber
                  ? undefined
                  : this.fetchStudentsByPage.bind(this, pageNumber)
              }
            >
              {pageNumber}
            </a>
          ))}
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title is-size-2 has-text-grey">Students</h1>
        <Link
          className="button is-primary"
          to="students/create"
          style={{ marginBottom: 20 }}
        >
          Add new student
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
              {this.renderPages()}
            </div>
          )}
      </MainContent>
    );
  }
}

export default StudentList;
