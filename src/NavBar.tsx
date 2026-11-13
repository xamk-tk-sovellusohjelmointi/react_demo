import { Link } from 'react-router'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Example App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>
        <Button color="inherit" component={Link} to="/form">
          Newsletter
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
