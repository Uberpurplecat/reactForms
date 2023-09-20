import { useState } from "react";

export default function SignUpForm(props) {
  const [signUpUsername, setUsername] = useState("");
  const [signUpPassword, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const postOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: signUpUsername, password: signUpPassword})
        }
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", postOptions)
        const result = await response.json();
        
        console.log("RESULT TOKEN:" + result.token);
        props.setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={signUpUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <br/>Password:{" "}
          <input
            type="password"
            value={signUpPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button>Submit</button>
      </form>
    </>
  );
}