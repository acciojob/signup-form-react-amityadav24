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
  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const { name, email, gender, phoneNumber, password } = form;

    if (!name || !email || !phoneNumber || !password) {
      return setMsg("All fields are mandatory");
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      return setMsg("Name is not alphanumeric");
    }
    if (!email.includes("@")) {
      return setMsg("Email must contain @");
    }
    if (!["male", "female", "other"].includes(gender)) {
      return setMsg("Please identify as male, female or others");
    }
    if (!/^[0-9]+$/.test(phoneNumber)) {
      return setMsg("Phone Number must contain only numbers");
    }
    if (password.length < 6) {
      return setMsg("Password must contain atleast 6 letters");
    }

    const user = email.split("@")[0];
    setMsg(`Hello ${user}`);
  };

  return (
    <div id="main">
      <form onSubmit={submit}>
        <input
          data-testid="name"
          type="text"
          name="name"
          value={form.name}
          onChange={change}
        />
        <input
          data-testid="email"
          type="text"
          name="email"
          value={form.email}
          onChange={change}
        />
        <select
          data-testid="gender"
          name="gender"
          value={form.gender}
          onChange={change}
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
          onChange={change}
        />
        <input
          data-testid="password"
          type="password"
          name="password"
          value={form.password}
          onChange={change}
        />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default App;
