import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const { name, email, gender, phoneNumber, password } = formData;

    // Priority 1: Check if required fields are empty
    if (!name) return "All fields are mandatory.";
    if (!email) return "All fields are mandatory.";
    if (!phoneNumber) return "All fields are mandatory.";
    if (!password) return "All fields are mandatory.";

    // Priority 2+: Field format validation
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      return "Name is not alphanumeric.";
    }

    if (!email.includes("@")) {
      return "Email must contain @.";
    }

    if (!["male", "female", "other"].includes(gender)) {
      return "Please identify as male, female or others.";
    }

    if (!/^\d+$/.test(phoneNumber)) {
      return "Phone Number must contain only numbers.";
    }

    if (password.length < 6) {
      return "Password must contain atleast 6 letters.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
    } else {
      const username = formData.email.split("@")[0];
      setMessage(`Hello ${username}`);
    }
  };

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />

        <input
          data-testid="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />

        <select
          data-testid="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <br />

        <input
          data-testid="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <br />

        <input
          data-testid="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <br />

        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
