import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { cyan,lightBlue,blueGrey, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import {  Box, Button, Divider, Snackbar, TextField, TextareaAutosize } from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import CommentForm from '../Comment/CommentForm';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTextarea = styled(TextField)(
    ({ theme }) => `
    width: 100%;
    max-width:100%;
    height: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0px;
    margin:0px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    border-radius:18px;
    overflow: hidden;
    border:none;
  
    // firefox
    &:focus {
        outline: 0;
        border:none;
        background:red;
      }
      &:hover {
        outline: 0;
        border:none;
      }
    &:focus-visible {
        outline: none;
      border:none;
    }
  `,
  );

export default function PostForm(props) {
  const { postUserId,userName,refreshPost } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false); // State for tracking liked status of comments
  const theme = useTheme();
  const [text, setText] = React.useState("")
  const [isSent, setIsSent] = React.useState(false);

  const savePost = () => {
    // İstek yapılacak URL'yi belirtin
    const url = 'http://localhost:8080/posts';
  
    // İstek yapılacak verileri ve ayarları içeren bir nesne oluşturun
    const options = {
      method: 'POST', // POST isteği yapılacak
      headers: {
        'Content-Type': 'application/json' // İstek gövdesinin JSON olduğunu belirtin
      },
      body: JSON.stringify({
        title: 'Sample Post',
        text: text,
        postUserId: postUserId
      })
    };
  
    // fetch fonksiyonunu kullanarak isteği gönderin ve yanıtı işleyin
    fetch(url, options)
      .then(response => {
        // Yanıtı kontrol edin ve gerekirse işleyin
        if (response.ok) {
          console.log('Post saved successfully!');
          setIsSent(true);
        } else {
          throw new Error('Failed to save post.');
        }
      })
      .catch(error => {
        // Hata durumunda hata mesajını yakalayın ve işleyin
        console.error(error);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSubmit = () => {
    savePost();
    setText("");
    setTimeout(() => {
      window.location.reload(); // Reload the page after a delay
    }, 1000);

  };
  const handleText = (value) => {
    setText(value)
    setIsSent(false);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };


  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical:'top',horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Post Başarıyla Gönderildi
        </Alert>
      </Snackbar>
      <Card sx={{ width: 800, maxWidth: 800, margin: '10px' }} >
     <CardHeader
         sx={{
            background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);',
          }}
         avatar={
          <Avatar
          sx={{ bgcolor: blueGrey.A700 }}
          aria-label="recipe"
          >
              H
          </Avatar>
         }
         title = {
          <StyledTextarea sx={{fontSize:'20px'}} autoFocus={true}  id="outlined-multiline-static"
          multiline
          onChange={ (i) => handleText(i.target.value)}
          value={text}
          placeholder="Neler oluyor?" /> 
         }
       />
       <Divider/>
       <CardActions disableSpacing sx={{justifyContent:'flex-end', alignContent:'center'} } >
            {/* Like Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                margin: '5px',
                padding: '10px 10px',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: '0.5s',
                backgroundSize: '200% auto',
                color: 'white',
                borderRadius: '10px',
                display: 'block',
                backgroundImage: 'linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%)',
                '&:hover': {
                  backgroundPosition: 'right center',
                  color: '#fff',
                  textDecoration: 'none',
                },
              }}
            >
              Gönder
            </Button>


          </CardActions>

  </Card>
    </div>
   
  );
}
