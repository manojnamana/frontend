import { UpdateInterViewDateTime } from '@/pages/api/profile';
import { Dialog, DialogTitle, DialogContent, InputLabel, TextField, DialogActions, Button } from '@mui/material'
import React, { useState } from 'react'



const DialogInterView = ({Dialogopen,setDialogOpen,setInviewDateUpdated,jobiId,profileId}:any) => {
        const [selectedDate, setSelectedDate] = useState<string | null>(null);
        const [selectedTime, setSelectedTime] = useState<string | null>(null);
        const [isTimeInvalid, setIsTimeInvalid] = useState<boolean>(false);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setSelectedDate(date);
      
        // Reset time if the date is changed
        if (date !== selectedDate) {
          setSelectedTime(null);
        }
      };
      
      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
      
        // Validate time if today's date is selected
        if (selectedDate === getCurrentDate() && time < getCurrentTime()) {
          setIsTimeInvalid(true);
          setSelectedTime(null);
        } else {
          setIsTimeInvalid(false);
          setSelectedTime(time);
        }
      };
      
      const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // "yyyy-mm-dd" format
      };
      
      const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(" ")[0].slice(0, 5); // "HH:mm" format
      };
      
      // Calculate minimum time dynamically
      const getMinTime = () => {
        return getCurrentTime(); // Return current time for validation
      };
    
     const handleSubmit = async(event: React.ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setDialogOpen(false)
        const dateTime = `${selectedDate},${selectedTime}`
    
        try{
          await UpdateInterViewDateTime({interviewTime:dateTime,JobId:jobiId,ProfileId:profileId})
          setInviewDateUpdated(true)
        }
        catch(error){
          console.error(error)
          setInviewDateUpdated(true)
    
        }
        
        
        
      
      }
    
      const handleDialogClose = ()=>{
        setDialogOpen(false)
    }

  return (
    <Dialog
        open={Dialogopen}
        onClose={handleDialogClose}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit :(handleSubmit)
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries((formData as any).entries());
          //   const date = formJson.Date;
          //   const time = formJson.Time;
          // },
        }}
      >
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
  {/* Date Field */}
  <InputLabel sx={{ mt: 2 }}>Date</InputLabel>
  <TextField
    autoFocus
    required
    margin="dense"
    id="date"
    name="Date"
    type="date"
    value={selectedDate || ""}
    onChange={handleDateChange}
    fullWidth
    variant="outlined"
    InputProps={{
      inputProps: {
        min: getCurrentDate(), // Restrict to today or future dates
      },
    }}
  />

  {/* Time Field */}
  <InputLabel sx={{ mt: 2 }}>Time</InputLabel>
  <TextField
    required
    margin="dense"
    id="time"
    name="Time"
    type="time"
    value={selectedTime || ""}
    fullWidth
    variant="outlined"
    error={isTimeInvalid} // Highlight error if time is invalid
    helperText={
      isTimeInvalid
        ? "For today, the selected time must be later than the current time."
        : ""
    }
    onChange={handleTimeChange} // Update time state on change
    InputProps={{
      inputProps: {
        min: selectedDate === getCurrentDate() ? getMinTime() : "00:00", // Restrict to current time or later if today
        
      },
    }}
  />
</DialogContent>

        <DialogActions>
          <Button variant='outlined' onClick={handleDialogClose}>Cancel</Button>
          <Button variant='contained' type='submit'>Sechudule</Button>
        </DialogActions>
                </Dialog>
  )
}

export default DialogInterView


