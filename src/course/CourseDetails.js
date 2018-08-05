import React from "react";
import MainContent from "../common/MainContent";
import TextField from "../common/TextField";

class CourseDetails extends React.PureComponent {
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
      course: null
    };
  }

  handleFieldChange = e => {
    const { target, name } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      course: {
        ...this.state.course,
        [name]: value
      }
    });
  };

  render() {
    return (
      <MainContent>
        <h1 className="title is-size-2 has-text-grey">Course details</h1>
        <div className="box" style={{ maxWidth: 800 }}>
          <form>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Title</label>
              </div>
              <div className="field-body">
                <TextField
                  name="title"
                  placeholder="Title"
                  onChange={this.handleFieldChange}
                />
              </div>
            </div>
          </form>
        </div>
      </MainContent>
    );
  }
}

export default CourseDetails;
