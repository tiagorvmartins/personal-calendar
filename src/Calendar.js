import { useState } from 'react';
import * as moment from 'moment';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DialogComponent from './Dialog';

const Day = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: '5px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid black',
    position: 'relative',
    width: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    cursor: 'pointer'
}));

const CurrentDay = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#7e7ed1',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid black',
    position: 'relative',
    width: '25px',
    margin: '5px',
    height: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}));

function Calendar (props) {
    
    const [ markedDays, setMarkedDays ] = useState({});
    
    const [ today ] = useState(moment().startOf('day'));
    function markDay(date) {
        setMarkedDays({...markedDays, [date]: true})    
    }
      
    const endMonth = moment(props.initial).endOf('month');

    const [ open, setOpen ] = useState(false);

    const [ dayClicked, setDayClicked ] = useState(null);

    const handleClose = function() {
        setOpen(false);
    };

    const handleAgree = function(day, momentDate, steps, calories, duration) {
        markDay(`${day}-${momentDate.month()}-${momentDate.year()}`);
        props.insertHistory(momentDate.month(), {day, steps, calories, duration });
        setOpen(false);
    }

    const clickDay = function(day) {
        if(!markedDays[`${day}-${endMonth.month()}-${endMonth.year()}`]){
            setDayClicked(day); 
            setOpen(true);
        }
    }
    
    let arraySquares = [];
    const weekLines = [];
    for(let i = 1; i <= endMonth.date(); i++){    
        if(i === today.date() && today.month() === endMonth.month() && today.year() === endMonth.year()) {
        arraySquares.push(
            <CurrentDay 
                className={markedDays[`${i}-${endMonth.month()}-${endMonth.year()}`] === true ? 'marked' : ''}
                
                onClick={() => { clickDay(i); } }
                key={i}>
                <span style={{zIndex: 5, fontSize: '22px', fontWeight: 'bold'}}>{i}</span>
            </CurrentDay>);
        } else {
        arraySquares.push(
            <Day 
            className={markedDays[`${i}-${endMonth.month()}-${endMonth.year()}`] === true ? 'marked' : ''}
            
            onClick={() => { clickDay(i); } }
            key={i}>
                <span style={{zIndex: 5, fontSize: '22px', fontWeight: 'bold'}}>{i}</span>
            </Day>);
        }

        if(i % 7 === 0) {      
            weekLines.push(arraySquares.splice(0, 7));
        }        
    }

    weekLines.push([...arraySquares]);

    return (<div>
            { 
            weekLines.map((weekLine, i) => { 
                return (
                    <Grid
                        key={i}
                        container 
                        columns={{ xs: 12, md: 12 }}
                        spacing={0}                    
                        className="week">
                    {
                        weekLine.map((day) => {
                            return (day)             
                        })                 
                    }
                    </Grid>
                )
                })
            }
                <DialogComponent 
                    day={dayClicked}
                    month={endMonth}
                    open={open} 
                    handleClose={handleClose} 
                    handleAgree={handleAgree}/>
            </div>
        );      
}

export default Calendar;