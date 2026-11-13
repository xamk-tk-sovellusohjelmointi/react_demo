import { useNavigate } from 'react-router'
import { Button, Stack, TextField, Typography } from '@mui/material'

export type Subscriber = {
  name: string
  email: string
}

type FormProps = {
  onSubscribe: (subscriber: Subscriber) => void
}

function Form({ onSubscribe }: FormProps) {
  const navigate = useNavigate()

  // The data is only kept in the app's state, it is not sent anywhere.
  function subscribe(formData: FormData) {
    onSubscribe({
      name: String(formData.get('name')),
      email: String(formData.get('email')),
    })
    navigate('/thank-you')
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Newsletter
      </Typography>
      <Stack component="form" action={subscribe} spacing={2}>
        <TextField name="name" label="Name" required />
        <TextField name="email" label="Email" type="email" required />
        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </Stack>
    </>
  )
}

export default Form
