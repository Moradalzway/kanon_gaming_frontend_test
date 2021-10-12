import axios from "axios";
import { Component } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import { connect } from "react-redux";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Form, Field } from "react-final-form";
import { registerAction } from "../redux/actions/auth";

class Register extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.Regsiter = this.Regsiter.bind(this);
    this.saveToRedux = this.saveToRedux.bind(this);
  }

  handleInputChange(event: any) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async Regsiter(values: any) {
    this.setState({
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    const baseURL = "/users/create";

    await axios
      .post(baseURL, { ...values, name: values.fullname })
      .then((response: any) => {
        if (response.status === 201) {
          this.props.history.push("/");
          this.saveToRedux(response.data.result);

          this.setState({
            isLoading: false,
            isError: false,
            isSuccess: true,
            message: response.data.message,
          });
        } else {
          this.setState({
            isLoading: false,
            isError: true,
            isSuccess: false,
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isError: true,
          isSuccess: false,
          message: error.response.data.message,
        });
      });
  }

  async saveToRedux(userData: any) {
    await this.props.registerAction(userData);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <>
        <div className="card " style={{ width: "500px", margin: "auto " }}>
          {this.state.isLoading && (
            <div className="card text-center">
              <RotateLoader
                loading={this.state.isLoading}
                color="#E94560"
                size={15}
                margin={2}
              />
            </div>
          )}
          {this.state.isSuccess && (
            <div className="alert alert-success">{this.state.message}</div>
          )}
          {this.state.isError && (
            <div className="alert alert-danger">{this.state.message}</div>
          )}

          <Form
            onSubmit={this.Regsiter}
            validate={(values) => {
              const errors: any = {};
              function validateEmail(email: string) {
                var re =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
              }
              if (!values.fullname) {
                errors.fullname = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (!validateEmail(values.email)) {
                errors.email = "Not an email adress";
              }
              if (!values.password) {
                errors.password = "Required";
              }

              return errors;
            }}
            render={({
              handleSubmit,
              // values,
              // submitting,
              // validating,
              valid,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="fullname">Full Name</Label>
                  <Field name="fullname">
                    {({ input, meta }) => (
                      <div>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Full name"
                          invalid={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <br />
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field name="email">
                    {({ input, meta }) => (
                      <div>
                        <Input
                          {...input}
                          type="email"
                          placeholder="Email"
                          invalid={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <br />
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Field name="password">
                    {({ input, meta }) => (
                      <div>
                        <Input
                          {...input}
                          type="password"
                          placeholder="password"
                          invalid={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <br />
                <Button
                  type="submit"
                  color="primary"
                  className="btn btn-primary btn-block"
                  style={{ width: "100%" }}
                  disabled={!valid}
                >
                  Submit
                </Button>
              </form>
            )}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn,
  state: state,
});

const mapDispatchToProps = () => ({
  registerAction,
});

export default connect(mapStateToProps, mapDispatchToProps())(Register);
