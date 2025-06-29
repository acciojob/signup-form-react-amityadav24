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

    if (!name || !email || !phoneNumber || !password) {
      setMessage("All fields are mandatory");
      return;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      setMessage("Name is not alphanumeric");
      return;
    }
    if (!email.includes("@")) {
      setMessage("Email must contain @");
      return;
    }
    if (!["male", "female", "other"].includes(gender)) {
      setMessage("Please identify as male, female or others");
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setMessage("Phone Number must contain only numbers");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must contain atleast 6 letters");
      return;
    }

    const username = email.split("@")[0];
    setMessage(`Hello ${username}`);
  };

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          data-testid="email"
          type="text"
          name="email"
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
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          data-testid="password"
          type="password"
          name="password"
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
