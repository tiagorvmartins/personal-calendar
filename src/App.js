import './App.css';
import { useState } from 'react';
import * as moment from 'moment';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Calendar from './Calendar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function App() {

  const [ initial, setInitial ] = useState(moment());
  const currentDay = moment(initial).startOf('day');
  const [ history, setHistory ] = useState({[initial.month()]:[]});
  
  function nextMonth() {    
    setInitial(moment(initial.add(1, 'months')));    
  }

  function previousMonth() {
    setInitial(moment(initial.subtract(1, 'months')));
  }

  function handleHistory(month, data) {
    console.log(data);
    const newHistoryArray = history[month].concat([data]);    
    const newHistoryMonth = { [month] : newHistoryArray };
    setHistory({ ...history, ...newHistoryMonth });
    console.log(history);
  }

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
      
      <Grid container>      
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <Stack spacing={0.5}>
              <Calendar initial={initial} insertHistory={handleHistory}/>            
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <Paper style={{maxHeight: 300, overflow: 'auto', boxShadow: 'unset'}}>          
              <List padding={3} style={{marginRight: '10px'}}>
                
                {              
                history[initial.month()].sort((a,b) => a.day - b.day).map((data) => {
                  return (
                    <ListItem 
                      key={data.day}
                      sx={{
                        backgroundColor: '#BEBEBE', 
                        border: '1px solid black', 
                        borderRadius: '3px', 
                        padding: '15px',
                        marginBottom: '10px'
                      }}>
                      <ListItemText
                        primary={`Steps: ${data.steps} | Calories: ${data.calories} | Duration: ${data.duration}m`}
                        secondary={`${data.day} ${initial.format('MMMM')} ${initial.format('YYYY')}`}
                      />
                    </ListItem>
                  );
                })}             
                                          
              </List>
            </Paper>        
          </Box>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
