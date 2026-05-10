import { useState } from "react";
import { request, saveTokens } from "../api";
import OutputBox from "../components/OutputBox";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [result, setResult] = useState("Login to store JWT tokens.");
  const [error, setError] = useState(false);

  const submit = async () => {
    try {
      const data = await request("/login/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      saveTokens(data.access, data.refresh);
      setResult({
        message: data.message,
        access_saved: Boolean(data.access),
        refresh_saved: Boolean(data.refresh),
      });
      setError(false);
    } catch (err) {
      setResult(err.message);
      setError(true);
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <label>Username</label>
      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>POST /login/</button>
      <OutputBox data={result} isError={error} />
    </div>
  );
}
