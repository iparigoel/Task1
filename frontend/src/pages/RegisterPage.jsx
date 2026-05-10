import { useState } from "react";
import { request } from "../api";
import OutputBox from "../components/OutputBox";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [result, setResult] = useState("Fill form and register.");
  const [error, setError] = useState(false);

  const submit = async () => {
    try {
      const data = await request("/register/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setResult(data);
      setError(false);
    } catch (err) {
      setResult(err.message);
      setError(true);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <label>Username</label>
      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <label>Confirm Password</label>
      <input
        type="password"
        value={form.password2}
        onChange={(e) => setForm({ ...form, password2: e.target.value })}
      />
      <button onClick={submit}>POST /register/</button>
      <OutputBox data={result} isError={error} />
    </div>
  );
}
