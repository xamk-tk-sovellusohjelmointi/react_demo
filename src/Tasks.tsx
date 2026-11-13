import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

type Task = {
  uuid: string
  name: string
  completed: boolean
}

const STORAGE_KEY = 'tasks'

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[]
  } catch {
    return []
  }
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  // Save the tasks to localStorage every time the list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(formData: FormData) {
    const name = String(formData.get('name')).trim()
    if (!name) return

    const newTask: Task = { uuid: crypto.randomUUID(), name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTask(uuid: string) {
    setTasks(
      tasks.map((task) =>
        task.uuid === uuid ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function removeTask(uuid: string) {
    setTasks(tasks.filter((task) => task.uuid !== uuid))
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Tasks
      </Typography>
      <Typography variant="body1" gutterBottom>
        Type a task name and click Add to add it to the list. Tick the checkbox
        to mark a task as completed, and click the trash icon to remove it.
        Your tasks are saved in this browser, so they are still here when you
        come back.
      </Typography>

      <Stack component="form" action={addTask} direction="row" spacing={2}>
        <TextField name="name" label="New task" required fullWidth />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.uuid}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                aria-label={`Remove ${task.name}`}
                onClick={() => removeTask(task.uuid)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => toggleTask(task.uuid)}
                slotProps={{ input: { 'aria-label': task.name } }}
              />
            </ListItemIcon>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Tasks
