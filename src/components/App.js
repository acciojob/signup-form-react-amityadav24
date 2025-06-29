import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, gender, phoneNumber, password } = form;

    // Priority 1: All fields are mandatory
    if (!name || !email || !phoneNumber || !password) {
      setMessage("All fields are mandatory");
      return;
    }

    // Priority 2: Name must be alphanumeric
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      setMessage("Name is not alphanumeric");
      return;
    }

    // Priority 3: Email must contain @
    if (!email.includes("@")) {
      setMessage("Email must contain @");
      return;
    }

    // Priority 4: Gender must be male, female, other
    if (!["male", "female", "other"].includes(gender)) {
      setMessage("Please identify as male, female or others");
      return;
    }

    // Priority 5: Phone Number must be numbers
    if (!/^[0-9]+$/.test(phoneNumber)) {
      setMessage("Phone Number must contain only numbers");
      return;
    }

    // Priority 6: Password must be at least 6 characters
    if (password.length < 6) {
      setMessage("Password must contain atleast 6 letters");
      return;
    }

    // All validations passed – greet user
    const username = email.split("@")[0];
    setMessage(`Hello ${username}`);
  };

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <input
          data-testid="email"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
        <select
          data-testid="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <input
          data-testid="phoneNumber"
          name="phoneNumber"
          type="text"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          data-testid="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
