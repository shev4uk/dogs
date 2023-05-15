import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Filter({
  breeds,
  onFilter,
}: {
  breeds: string[];
  onFilter: (params: any) => any;
}) {
  const [filter, setFilter] = useState({
    breeds: [],
    age: [0, 20],
  });
  function filterSubmit(event: any) {
    event.preventDefault();
    let filteredObj = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) =>
        Array.isArray(value) ? value.length > 0 : value
      )
    );
    filteredObj = {
        ...filteredObj,
        ageMin: filter.age[0] as unknown as number[],
        ageMax: filter.age[1] as unknown as number[],
    }
    delete filteredObj.age;
    onFilter(filteredObj);
  }
  const handleChange = (event: Event, newValue: number | number[]) => {
    setFilter({ ...filter, age: newValue as number[] });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option: HTMLOptionElement) => option.value
    ) as [];
    setFilter({ ...filter, breeds: selectedOptions });
  };
  return (
    <>
      <form onSubmit={filterSubmit}>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Breeds
            </InputLabel>
            <Select
              multiple
              native
              value={filter.breeds}
              // @ts-ignore Typings are not considering `native`
              onChange={handleChangeSelect}
              label="Native"
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography id="input-slider" gutterBottom>
            Age
          </Typography>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Age"}
              value={filter.age}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={20}
            />
          </Box>
        </div>
        <Button type="submit" variant="contained">
          Filter
        </Button>
      </form>
    </>
  );
}

export default Filter;
