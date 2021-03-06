import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core"
import MomentUtils from "@date-io/moment"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import moment from "moment"

import { tasks } from "reducers/tasks"

export const TodoInput = (props) => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")

  const [selectedDate, setSelectedDate] = useState(Date.now())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      tasks.actions.addTask({
        description,
        date: moment(selectedDate).calendar({
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY",
        }),
      })
    )
    props.onClose()
    props.handleSnack()
  }

  const handleCancel = (e) => {
    props.onClose()
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Add a new task</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          variant="standard"
          name="name"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="static"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <DialogActions>
          <Button onClick={handleSubmit}>
            Done
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
