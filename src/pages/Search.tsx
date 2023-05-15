import { useEffect, useState } from "react";
import Filter from "./../components/Filter";
import Sort from "./../components/Sort";
import ResultSearch from "./../components/ResultSearch";
import useFetch from "../hooks/useFetch";

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';
import { Dog } from "../models/Dog";

function Search() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [request, setRequest] = useState({
    size: 25,
    sort: "name:asc",
  });
  const [error, setError] = useState('');
  const fetchRequest = useFetch();
  useEffect(() => {
    fetchRequest.get("dogs/breeds").then((data) => {
      setBreeds(data);
    })
    .catch(() => {
        setError('Error. something went wrong. Contact administrator');
    });
  }, []);
  useEffect(() => {
    searchDogs(request);
  }, [request]);
  function searchDogs(params = {}) {
    const queryParams: { [key: string]: any } = params;
    const url = new URL(
      "https://frontend-take-home-service.fetch.com/dogs/search?"
    );
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.append(key, queryParams[key]);
    });

    fetchRequest.get("dogs/search" + url.search).then((res) => {
      setCount(Math.ceil(res.total / request.size) - 1);
      fetchRequest.post("dogs", JSON.stringify(res.resultIds)).then((data) => {
        setDogs(data);
      });
    });
  }
  function onFilter(params: any) {
    setRequest({
        ...request,
        ...params,
      });
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setRequest((prevState) => {
      const updatedState = {
        ...prevState,
        from: value * prevState.size
      };
      return updatedState;
    });
  };
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Filter and Search
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Filter breeds={breeds} onFilter={onFilter} />
          </Grid>
          <Grid xs={6}>
            <Sort onSort={onFilter} />
          </Grid>
        </Grid>
        <Typography variant="h5" align="center" gutterBottom>
          Search Results
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          <ResultSearch dogs={dogs} />
        </Grid>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
      </Container>
    </>
  );
}

export default Search;
