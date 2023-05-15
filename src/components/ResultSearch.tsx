import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Dog } from "../models/Dog";

function ResultSearch({ dogs }: { dogs: Dog[] }) {
  const [selectedDogs, setSelectedDogs] = useState<{ [key: string]: Dog}>(
    {}
  );
  useEffect(() => {
    const items = localStorage.getItem("dogs");
    if (items) {
      setSelectedDogs(JSON.parse(items));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("dogs", JSON.stringify(selectedDogs));
  }, [selectedDogs]);
  function toggleMatch(dog: Dog) {
    setSelectedDogs((prevState) => {
        if (dog.id in prevState) {
            const copy = { ...prevState };
            delete copy[`${dog.id}`];
            return copy;
        } else {
            return ({
                ...prevState,
                [`${dog.id}`]: dog
            })
        }
    });
  }
  return (
    <>
      {dogs.map((dog) => (
        <Grid key={dog.id} xs={6} onClick={() => toggleMatch(dog)}>
          <Card className={dog.id in selectedDogs ? "selected" : ""}>
            <CardHeader title={dog.name} />
            <CardMedia
              component="img"
              height="194"
              image={dog.img}
              alt={dog.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Breed: {dog.breed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Age: {dog.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Zip code: {dog.zip_code}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default ResultSearch;
