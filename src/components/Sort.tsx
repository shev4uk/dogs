import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Sort({ onSort }: { onSort: (params: any) => any }) {
  const [optionSort, setOptionSort] = useState({
    size: "25",
    sort: "asc" as "asc" | "desc",
  });
  function handleChangeSelect(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    setOptionSort((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };
      onSort({
        size: updatedState.size,
        sort: "name:" + updatedState.sort,
      });
      return updatedState;
    });
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={optionSort.size}
              label="Size"
              name="size"
              onChange={handleChangeSelect}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={optionSort.sort}
              label="Sort"
              name="sort"
              onChange={handleChangeSelect}
            >
              <MenuItem value={"asc"}>asc</MenuItem>
              <MenuItem value={"desc"}>desc</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default Sort;
