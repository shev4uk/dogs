import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

function Layout() {
  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid>
            <Link to="search">Search</Link>
          </Grid>
          <Grid>
            <Link to="match">Match</Link>
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </>
  );
}
export default Layout;
