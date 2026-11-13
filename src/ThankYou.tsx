import { Link } from 'react-router'
import { Button, Typography } from '@mui/material'

type ThankYouProps = {
  name: string
  email: string
}

function ThankYou({ name, email }: ThankYouProps) {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Thank you, {name}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have subscribed to our newsletter with the following details:
      </Typography>
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Back to home
      </Button>
    </>
  )
}

export default ThankYou
