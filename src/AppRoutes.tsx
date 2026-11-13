import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Container, Stack } from '@mui/material'
import NavBar from './NavBar.tsx'
import App from './App.tsx'
import About from './About.tsx'
import Form, { type Subscriber } from './Form.tsx'
import ThankYou from './ThankYou.tsx'
import Tasks from './Tasks.tsx'

function AppRoutes() {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)

  return (
    <Stack spacing={4}>
      <NavBar />
      <Container component="main">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/form" element={<Form onSubscribe={setSubscriber} />} />
          <Route
            path="/thank-you"
            element={
              subscriber ? (
                <ThankYou name={subscriber.name} email={subscriber.email} />
              ) : (
                <Navigate to="/form" replace />
              )
            }
          />
        </Routes>
      </Container>
    </Stack>
  )
}

export default AppRoutes
