import './App.css';
import { useState } from 'react';
import * as moment from 'moment';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

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
}));

const CurrentDay = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#7e7ed1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid black',
  width: '25px',
  margin: '5px',
  height: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function App() {

  const [ markedDays, setMarkedDays ] = useState({});
  const [ today ] = useState(moment().startOf('day'));
  const [ initial, setInitial ] = useState(moment());

  function nextMonth() {    
    setInitial(moment(initial.add(1, 'months')));    
  }

  function previousMonth() {
    setInitial(moment(initial.subtract(1, 'months')));
  }

  function markDay(date) {
    setMarkedDays({...markedDays, [date]: true})    
  }
    
  const currentDay = moment(initial).startOf('day');  
  const endMonth = moment(initial).endOf('month');
  
  let arraySquares = [];
  const weekLines = [];
  for(let i = 1; i <= endMonth.date(); i++){    
    if(i === today.date() && today.month() === endMonth.month() && today.year() === endMonth.year()) {
      arraySquares.push(<CurrentDay key={i}>{i}</CurrentDay>);
    } else {
      arraySquares.push(
        <Day 
          className={markedDays[`${i}-${endMonth.month()}-${endMonth.year()}`] === true ? 'marked' : ''}
          onClick={() => markDay(`${i}-${endMonth.month()}-${endMonth.year()}`)} 
          key={i}>
          <span style={{zIndex: 5, fontSize: '22px', fontWeight: 'bold'}}>{i}</span>
        </Day>);
    }

    if(i % 7 === 0) {      
      weekLines.push(arraySquares.splice(0, 7));
    }
  }

  weekLines.push([...arraySquares]);

  return (
    <div className="App">
      <div className="calendarControl">
        <IconButton onClick={previousMonth}>
          <ChevronLeft  />        
        </IconButton>
        <div className="monthName">
          {currentDay.format('MMMM')}, {currentDay.format('YYYY')} 
        </div>                    
        <IconButton onClick={nextMonth}>
          <ChevronRight />
        </IconButton>               
      </div>
      <Stack spacing={0.5}>
            { 
              weekLines.map((weekLine, i) => { 
                return (
                  <Grid
                    key={i}
                    container 
                    columns={{ xs: 12, md: 6 }}
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
        </Stack>
    </div>
  );
}

export default App;
