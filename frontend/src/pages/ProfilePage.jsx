import { useState } from "react";
import { clearTokens, request } from "../api";
import OutputBox from "../components/OutputBox";

export default function ProfilePage() {
  const [result, setResult] = useState("Load profile with saved access token.");
  const [error, setError] = useState(false);

  const loadProfile = async () => {
    try {
      const data = await request("/profile/", { method: "GET" }, true);
      setResult(data);
      setError(false);
    } catch (err) {
      setResult(err.message);
      setError(true);
    }
  };

  const logout = () => {
    clearTokens();
    setResult("Tokens cleared.");
    setError(false);
  };

  return (
    <div className="card">
      <h2>Profile</h2>
      <button onClick={loadProfile}>GET /profile/ (Auth Required)</button>
      <button className="danger" onClick={logout}>
        Clear Tokens
      </button>
      <OutputBox data={result} isError={error} />
    </div>
  );
}
