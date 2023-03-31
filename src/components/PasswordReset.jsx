import React, { useState } from "react";

function AcceptInvitation() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");
    fetch(`/api/users/accept-invitation-and-change-password?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          setError(data.message);
          setSuccess("");
        } else {
          setError("");
          setSuccess(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <label>
        New Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Accept Invitation and Change Password</button>
    </form>
  );
}
