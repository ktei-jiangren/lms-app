import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import Loader from "../common/Loader";
import Button from "../common/Button";
import TextField from "../common/TextField";
import SelectField from "../common/SelectField";
import Notification from "../common/Notification";
import ConfirmDialog from "../common/ConfirmDialog";
import { getValidationErrors, redirect } from "../common/helper";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { pick } from "lodash/object";
import * as StudentAPI from "./StudentAPI";

function createNewStudent() {
  return {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "1999-01-01",
    email: "",
    credit: 0
  };
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(50)
    .label("First name")
    .required(),
  lastName: yup
    .string()
    .max(50)
    .label("Last name")
    .required(),
  gender: yup
    .string()
    .label("Gender")
    .required(),
  dateOfBirth: yup
    .string()
    .label("Date of birth")
    .required(),
  email: yup
    .string()
    .label("Email")
    .required(),
  credit: yup
    .number()
    .positive()
    .label("Credit")
    .required()
});

class StudentDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDelete: false,
      showSuccess: false,
      showError: false,
      error: "",
      validationErrors: {},
      student: null
    };
  }

  async componentDidMount() {
    if (this.isCreatingNewStudent()) {
      this.setState({ student: createNewStudent() });
      return;
    }

    try {
      this.setState({ isLoading: true });
      const id = this.getStudentId();
      let student = await StudentAPI.getStudentById(id);
      if (student === null) {
        // server should return 404 other than null student here
        this.setState({ error: "Student could not be found" });
        return;
      }

      student = {
        ...student,
        firstName: student.fullName.split(" ")[0],
        lastName: student.fullName.split(" ")[1]
      };

      this.setState({ student, isLoading: false });
    } catch (err) {
      this.setState({
        error: "Error occurred while loading the student",
        isLoading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id === "create" &&
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.setState({
        student: createNewStudent(),
        error: "",
        validationErrors: {}
      });
    }
  }

  handleFieldChange = e => {
    const {
      target,
      target: { name }
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      student: {
        ...this.state.student,
        [name]: value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userInput = pick(this.state.student, [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "email",
      "credit"
    ]);
    try {
      await schema.validate(userInput, {
        abortEarly: false
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors, isSaving: false });
      return;
    }

    try {
      this.setState({ validationErrors: {}, error: "", isSaving: true });
      if (this.isCreatingNewStudent()) {
        await StudentAPI.createStudent(userInput);
        this.setState({ isSaving: false });
        redirect("/students");
      } else {
        const id = this.getStudentId();
        await StudentAPI.updateStudent(id, userInput);
        this.setState({ isSaving: false });
        toast.success("Successfully saved the student");
      }
    } catch (err) {
      this.setState({
        error: "Error occurred while saving the student",
        isSaving: false
      });
    }
  };

  handleDelete = () => {
    this.setState({ showConfirmDelete: true });
  };

  handleCancelDelete = () => {
    this.setState({ showConfirmDelete: false });
  };

  handleConfirmDelete = async () => {
    this.setState({ isDeleting: true });
    try {
      await StudentAPI.deleteStudent(this.getStudentId());
      this.setState({ showConfirmDelete: false, isDeleting: false });
      redirect("/students");
    } catch (err) {
      this.setState({
        error: "Error occurred while deleting the student",
        isDeleting: false,
        showConfirmDelete: false
      });
    }
  };

  isCreatingNewStudent() {
    return this.getStudentId() === "create";
  }

  getStudentId() {
    return this.props.match.params.id;
  }

  renderForm() {
    return (
      <div className="box" style={{ maxWidth: 800 }}>
        <form onSubmit={this.handleSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Full name</label>
            </div>
            <div className="field-body">
              <TextField
                name="firstName"
                placeholder="First name"
                value={this.state.student.firstName}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["firstName"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Last name</label>
            </div>
            <div className="field-body">
              <TextField
                name="lastName"
                placeholder="Last name"
                value={this.state.student.lastName}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["lastName"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Gender</label>
            </div>
            <div className="field-body">
              <SelectField
                name="gender"
                value={this.state.student.gender}
                onChange={this.handleFieldChange}
                style={{ width: 100 }}
                error={this.state.validationErrors["gender"]}
              >
                <option value="">--Select--</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </SelectField>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Date of birth</label>
            </div>
            <div className="field-body">
              <TextField
                name="dateOfBirth"
                style={{ width: 200 }}
                placeholder="Date of birth"
                value={this.state.student.dateOfBirth}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["dateOfBirth"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Email</label>
            </div>
            <div className="field-body">
              <TextField
                name="email"
                placeholder="Email"
                value={this.state.student.email}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["email"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Credit</label>
            </div>
            <div className="field-body">
              <TextField
                name="credit"
                style={{ width: 100 }}
                placeholder="Date of birth"
                value={this.state.student.credit}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["credit"]}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <Button
                buttonType="primary"
                type="submit"
                loading={this.state.isSaving}
              >
                {this.isCreatingNewStudent() ? "Create" : "Save"}
              </Button>
            </div>
            <div className="control">
              <Link className="button" to="/students">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title is-size-2 has-text-grey">
          {this.isCreatingNewStudent() ? "New student" : "Student details"}
        </h1>
        {this.state.error && (
          <Notification type="danger">{this.state.error}</Notification>
        )}
        {this.state.isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
        {!this.state.isLoading &&
          this.state.student &&
          !this.isCreatingNewStudent() && (
            <Button
              buttonType="danger"
              style={{ marginBottom: 20 }}
              onClick={this.handleDelete}
            >
              Delete student
            </Button>
          )}
        {!this.state.isLoading && this.state.student && this.renderForm()}
        <ConfirmDialog
          active={this.state.showConfirmDelete}
          onPositive={this.handleConfirmDelete}
          onNegative={this.handleCancelDelete}
          title="Are you sure to continue"
          positiveButtonProps={{ loading: this.state.isDeleting }}
        >
          Are you sure you want to delete this student?
        </ConfirmDialog>
      </MainContent>
    );
  }
}

StudentDetails.propTypes = {
  match: PropTypes.object
};

export default StudentDetails;
