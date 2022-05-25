import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function DialogComponent(props){

    const [ steps, setSteps ] = useState('');
    const [ calories, setCalories ] = useState('');
    const [ duration, setDuration ] = useState('');

    const submit = function(){
        if(!steps || !calories || !duration){
            return;
        }
        return props.handleAgree(props.day, props.month, steps, calories, duration);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure that you wanna mark the day {props.day} {props.month.format('MMMM')} {props.month.format('YYYY')} as exercise done? 
                After marked it can't be unmarked! Input your exercise details:                
            </DialogContentText>
            <div style={{display:'flex', flexDirection:'row', margin:'5px'}}>
                <TextField                    
                    id="steps"
                    label="Steps"
                    style={{margin:'10px', width:'150px'}}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />
                <TextField                    
                    style={{margin:'10px', width:'150px'}}
                    id="calories"
                    label="Calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
                <TextField                    
                    style={{margin:'10px', width:'150px'}}
                    id="duration"
                    label="Duration (min)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose}>No</Button>
            <Button onClick={submit} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogComponent;