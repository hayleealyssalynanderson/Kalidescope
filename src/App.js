import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import { useState, useEffect, useRef, useCallback } from "react";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { ContactPageSharp, LineAxisOutlined } from '@mui/icons-material';
import axios from "axios";
import * as htmlToImage from "html-to-image";
import Button from '@mui/material/Button';
import scatterwithout from './images/scatterwithout.png'; 
import kalidescope from './images/kalidescope.png'; 
import lineAccount from './images/lineAccount.png'; 
import boxplot from './images/boxplot.png'; 

//<button onClick={initiateImage}>fgfg</button>
function App() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [data, setData] = useState(" ");

  function getdata(e){
    setData(e.target.value);
  }

  const [name, setName] = useState();


  function keyPress(e){
    if(e.keyCode == 13) {
      let value = name;
        if(e.target.value == "Current account balances by product type"){
          setName(boxplot);
         // setData(e.target.value)
        } else if(e.target.value == "Average deposit amount versus current account balance"){
            setName(scatterwithout);
        }
        else {
          setName(lineAccount);
        }
      
    }
  }
  
  const [post, setPost] = useState(" ");
  const [image, setImage] = useState(" ");

  const options = {
    method: 'POST',
    url: 'http://127.0.0.1:8000/visualization/',
    params: {'': ''},
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    data: {query: data}
    //data: {query: 'open accounts each year'}
   //barchart of rating
  };
  
 

   async function initiateImage() {
    axios.request(options).then(function (response) {
      console.log('it worked')
      setPost(response.data)
      console.log('HTML',response.data);
      setImage(response.data)
    }).catch(function (error) {
      console.error(error);
    });
   };

  

  
  return (
    <div className="App">
      <header className="App-header">
        <div style={{marginLeft:'370px', position:'static'}}>
          <img style={{marginTop:'50px'}}src={kalidescope}></img>
          <h1 className="App-title" style={{marginTop:'20px'}}> </h1>
          <p style={{fontSize:'14px', marginTop:'-30px'}}>A deep learning powered model that allows users to simply  </p>
          <p style={{fontSize:'14px'}}> use natural language to generate robust visuals over their datasets. </p>
          <AutoStoriesOutlinedIcon style={{marginLeft:'5px', marginTop:'-30px'}}/> <TipsAndUpdatesOutlinedIcon style={{marginLeft:'13px'}}/> <ElectricBoltOutlinedIcon style={{marginLeft:'10px'}}/>

          
          <Box
          >
             <div className="App">
            <img src={name} style={{height:'300px',marginTop:'60px', marginLeft:'-20px'}}/> <br />
          </div>
            <p>{data}</p>
          <TextField onKeyDown={keyPress} label="Ask a Question" variant="filled" style={{backgroundColor:'#40414f', width:'670px', marginTop:'50px'}} 
          InputProps={{endAdornment: <Button sx={{color:'#e2e3ea'}}><SendIcon/></Button>}} sx={{ input: { color: 'white' } }}  InputLabelProps={{
            sx: {
              color: "white",
              focusedColor: 'green',
              
            }
          }} />

<br></br>
<br></br>
          </Box>
        </div>
        <Drawer
        sx={{
          width: 330,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            backgroundColor:'#212123'
          },
          
        }}
        variant="permanent"
        anchor="left"
      >
        <br></br>
        <FormControl fullWidth sx={{marginLeft:'20px', width:'280px'}} >
          <InputLabel id="demo-simple-select-label" style={{color:'#e2e3ea'}} >Select Dataset</InputLabel>
          <Select
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7d777b',
                  height:'55px'
              },
              '& .MuiSvgIcon-root': {
                  color: 'white'
              }
          }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Select Dataset"
            onChange={handleChange}
          >
            <MenuItem value={10}>Account</MenuItem>
            <MenuItem value={20}>Product</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{backgroundColor:'#7d777b', marginTop:'200%', width:'300px', marginLeft:'10px'}} />
        <GitHubIcon sx={{color:'#e2e3ea', marginTop:'20px', marginLeft:'30px'}}/> <a href="https://github.com/hayleealyssalynanderson/Kalidescope" style={{textDecoration:'none', marginTop:'-20px',color:'#e2e3ea',fontSize:'15px', marginLeft:'-100px'}}>Github Repo</a>
        <br/>
        <LogoDevIcon sx={{color:'#e2e3ea',marginLeft:'30px'}}/> <a href="https://devpost.team/finastra/hackathons/605" style={{textDecoration:'none',marginTop:'-20px',color:'#e2e3ea',fontSize:'15px',marginLeft:'-50px'}} >Devpost Submission</a>
      </Drawer>
      </header>

      
    </div>
  );
}

export default App;
