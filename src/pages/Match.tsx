import { useState, useEffect } from "react";
import ResultSearch from "./../components/ResultSearch";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import useFetch from "../hooks/useFetch";
import Box from "@mui/material/Box";

function Match() {
  const [dogs, setDogs] = useState<any>(null);
  const [matchResult, setMatchResult] = useState<string>("");
  const [error, setError] = useState('');
  const fetchRequest = useFetch();
  useEffect(() => {
    const items = localStorage.getItem("dogs");
    if (items) {
      setDogs(JSON.parse(items));
    }
  }, []);
  function onMatch() {
    fetchRequest
      .post("dogs/match", JSON.stringify(Object.keys(dogs)))
      .then((data) => {
        setMatchResult(data.match);
      })
      .catch(() => {
        setError('Error. something went wrong. Contact administrator');
    });
  }
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Selected Dogs
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {dogs && Object.values(dogs).length > 0 && (
          <Box mb={2}>
            <Button variant="contained" onClick={onMatch}>
              Match
            </Button>
          </Box>
        )}
        {matchResult && (
          <Box mb={2}>
            <Typography variant="h5" align="center" gutterBottom>
              Your match Dog {dogs[matchResult].name} ❤️
            </Typography>
            <img src={dogs[matchResult].img} alt={dogs[matchResult].name} />
          </Box>
        )}
        <Grid container spacing={2}>
          {dogs && <ResultSearch dogs={Object.values(dogs)} />}
        </Grid>
      </Container>
    </>
  );
}

export default Match;
