import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import Loader from "../common/Loader";
import Button from "../common/Button";
import TextField from "../common/TextField";
import SelectField from "../common/SelectField";
import TextAreaField from "../common/TextAreaField";
import Notification from "../common/Notification";
import ConfirmDialog from "../common/ConfirmDialog";
import { getValidationErrors, redirect } from "../common/helper";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { pick } from "lodash/object";
import * as CourseAPI from "./CourseAPI";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(50)
    .label("Title")
    .required(),
  language: yup
    .string()
    .max(50)
    .label("Language")
    .required(),
  fee: yup
    .number()
    .positive()
    .min(10)
    .max(5000)
    .label("Fee")
    .required(),
  maxStudent: yup
    .number()
    .positive()
    .min(10)
    .max(40)
    .label("Max students")
    .required(),
  description: yup
    .string()
    .max(250)
    .label("Description")
});

function createNewCourse() {
  return {
    title: "",
    fee: "",
    description: ""
  };
}

class CourseDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDelete: false,
      showSuccess: false,
      showError: false,
      error: "",
      validationErrors: {},
      course: null
    };
  }

  async componentDidMount() {
    if (this.isCreatingNewCourse()) {
      this.setState({ course: createNewCourse() });
      return;
    }

    try {
      this.setState({ isLoading: true });
      const id = this.getCourseId();
      const course = await CourseAPI.getCourseById(id);
      if (course === null) {
        // server should return 404 other than null course here
        this.setState({ error: "Course could not be found" });
        return;
      }

      this.setState({ course, isLoading: false });
    } catch (err) {
      this.setState({
        error: "Error occurred while loading the course",
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
        course: createNewCourse(),
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
      course: {
        ...this.state.course,
        [name]: value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userInput = pick(this.state.course, [
      "title",
      "language",
      "fee",
      "maxStudent",
      "description"
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
      if (this.isCreatingNewCourse()) {
        await CourseAPI.createCourse(userInput);
        this.setState({ isSaving: false });
        redirect("/courses");
      } else {
        const id = this.getCourseId();
        await CourseAPI.updateCourse(id, userInput);
        this.setState({ isSaving: false });
        toast.success("Successfully saved the course");
      }
    } catch (err) {
      this.setState({
        error: "Error occurred while saving the course",
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
      await CourseAPI.deleteCourse(this.getCourseId());
      this.setState({ showConfirmDelete: false, isDeleting: false });
      redirect("/courses");
    } catch (err) {
      this.setState({
        error: "Error occurred while deleting the course",
        isDeleting: false,
        showConfirmDelete: false
      });
    }
  };

  isCreatingNewCourse() {
    return this.getCourseId() === "create";
  }

  getCourseId() {
    return this.props.match.params.id;
  }

  renderForm() {
    return (
      <div className="box" style={{ maxWidth: 800 }}>
        <form onSubmit={this.handleSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Title</label>
            </div>
            <div className="field-body">
              <TextField
                name="title"
                placeholder="Title"
                value={this.state.course.title}
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["title"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Language</label>
            </div>
            <div className="field-body">
              <SelectField
                name="language"
                placeholder="Language"
                value={this.state.course.language}
                onChange={this.handleFieldChange}
                style={{ width: 150 }}
                error={this.state.validationErrors["language"]}
              >
                <option>--Select--</option>
                <option value="csharp">C#</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="go">Go</option>
                <option value="ruby">Ruby</option>
                <option value="python">Python</option>
              </SelectField>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Fee ($)</label>
            </div>
            <div className="field-body">
              <TextField
                name="fee"
                placeholder="Fee ($)"
                value={this.state.course.fee}
                onChange={this.handleFieldChange}
                style={{ width: 150 }}
                error={this.state.validationErrors["fee"]}
              />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Max students</label>
            </div>
            <div className="field-body">
              <SelectField
                name="maxStudent"
                placeholder="Max number of students"
                value={this.state.course.maxStudent}
                onChange={this.handleFieldChange}
                style={{ width: 150 }}
                error={this.state.validationErrors["maxStudent"]}
              >
                <option>--Select--</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </SelectField>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Description</label>
            </div>
            <div className="field-body">
              <TextAreaField
                name="description"
                value={this.state.course.description}
                placeholder="Description for the course"
                onChange={this.handleFieldChange}
                error={this.state.validationErrors["description"]}
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
                {this.isCreatingNewCourse() ? "Create" : "Save"}
              </Button>
            </div>
            <div className="control">
              <Link className="button" to="/courses">
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
          {this.isCreatingNewCourse() ? "New course" : "Course details"}
        </h1>
        {this.state.error && (
          <Notification type="danger">{this.state.error}</Notification>
        )}
        {this.state.isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
        {!this.state.isLoading &&
          this.state.course &&
          !this.isCreatingNewCourse() && (
            <Button
              buttonType="danger"
              style={{ marginBottom: 20 }}
              onClick={this.handleDelete}
            >
              Delete course
            </Button>
          )}
        {!this.state.isLoading && this.state.course && this.renderForm()}
        <ConfirmDialog
          active={this.state.showConfirmDelete}
          onPositive={this.handleConfirmDelete}
          onNegative={this.handleCancelDelete}
          title="Are you sure to continue"
          positiveButtonProps={{ loading: this.state.isDeleting }}
        >
          Are you sure you want to delete this course?
        </ConfirmDialog>
      </MainContent>
    );
  }
}

CourseDetails.propTypes = {
  match: PropTypes.object
};

export default CourseDetails;
