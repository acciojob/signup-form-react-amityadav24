import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "male", // default gender
      phoneNumber: "",
      password: "",
      error: "",
      successMessage: "",
    };
  }

  validateForm = () => {
    const { name, email, gender, phoneNumber, password } = this.state;

    if (!name.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
      return "All fields are mandatory.";
    }

    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(name)) {
      return "Name is not alphanumeric.";
    }

    if (!email.includes("@")) {
      return "Email must contain @.";
    }

    const genderLower = gender.toLowerCase();
    if (!["male", "female", "other", "others"].includes(genderLower)) {
      return "Please identify as male, female or others.";
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone Number must contain only numbers.";
    }

    if (password.length < 6) {
      return "Password must contain atleast 6 letters";
    }

    return "";
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
      successMessage: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = this.validateForm();

    if (errorMessage) {
      this.setState({ error: errorMessage, successMessage: "" });
    } else {
      const username = this.state.email.split("@")[0];
      this.setState({
        error: "",
        successMessage: `Hello ${username}`,
      });
    }
  };

  render() {
    const { name, email, gender, phoneNumber, password, error, successMessage } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div>
            <label>
              Name:{" "}
              <input
                data-testid="name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Email address:{" "}
              <input
                data-testid="email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Gender:{" "}
              <select
                data-testid="gender"
                name="gender"
                value={gender}
                onChange={this.handleChange}
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
                <option value="others">others</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Phone Number:{" "}
              <input
                data-testid="phoneNumber"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Password:{" "}
              <input
                data-testid="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button data-testid="submit" type="submit">
            Submit
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {!error && successMessage && (
          <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
        )}
      </div>
    );
  }
}

export default App;
