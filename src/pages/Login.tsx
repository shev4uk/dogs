import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Grid from "@mui/material/Grid"; // Grid version 1
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';

function App() {
  const [login, setlogin] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchRequest = useFetch();

  function handleChange(event: any) {
    const value = event.target.value;
    setlogin({
      ...login,
      [event.target.name]: value,
    });
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    fetchRequest.post("auth/login", JSON.stringify({ ...login }))
    .then(() => {
        navigate("/search", { replace: true });
    })
    .catch(() => {
        setError('Name or email is not valid');
        setLoading(false);
    });
  }
  return (
    <>
      <Grid container spacing={2} height="100vh">
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <TextField
                id="name"
                name="name"
                label="Your name"
                variant="outlined"
                value={login.name}
                onChange={handleChange}
              />
              <TextField
                id="email"
                name="email"
                label="Your email"
                variant="outlined"
                value={login.email}
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Submiting' : 'Submit'}</Button>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
