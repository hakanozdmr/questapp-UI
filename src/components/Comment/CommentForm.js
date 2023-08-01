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
import { cyan,lightBlue,blueGrey, blue, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Button, Divider, Snackbar, TextField, TextareaAutosize } from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { PostWithAuth } from '../../services/HttpService';
import { useNavigate } from 'react-router-dom';

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
const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 95%;
    max-width:95%;
    height: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

export default function CommentForm(props) {
  const { userId,postId } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [text, setText] = React.useState("")
  const [isSent, setIsSent] = React.useState(false);
  const [commentLiked, setCommentLiked] = React.useState({}); // State for tracking liked status of comments
  const theme = useTheme();

  const navigate = useNavigate();
  const saveComment = () => {

    PostWithAuth("/comments", {
      id:0,
      text: text,
      userId: userId,
      postId: postId
    })
      .then((res) => {
        if (res.ok) {
          console.log('Comment saved successfully!');
          setIsSent(true);
          navigate(0)
        } else {
          throw new Error('Failed to save post.');
        }})
      .catch((err) => console.log(err))

  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };
  

  const handleCommentLike = (commentId) => {
    setCommentLiked((prevLiked) => ({
      ...prevLiked,
      [commentId]: !prevLiked[commentId],
    }));
  };
  const handleSubmit = () => {
    saveComment();
    setText("");

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
      <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}  anchorOrigin={{ vertical:'top',horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Yorum Başarıyla Gönderildi
        </Alert>
      </Snackbar>
      <Box sx={{ background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);',
  }}>
       <CardHeader
           
           avatar={
            <Avatar
            sx={{ bgcolor: blueGrey.A700 }}
            aria-label="recipe"
            >
                 {localStorage.getItem("currentUser") != null ? localStorage.getItem("userName").charAt(0).toUpperCase() : "Q"}
            </Avatar>
           }
           title = {
            <StyledTextarea inputProps aria-label="empty textarea" 
            onChange={ (i) => handleText(i.target.value)}
            value={text} placeholder="Yanıtla" /> 
           }
         />
         <Divider/>
         <CardActions disableSpacing sx={{justifyContent:'flex-end', alignContent:'center'} } >
              {/* Like Button */}
              <Button
                variant="contained"
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
                onClick={handleSubmit}
              >
                Gönder
              </Button>


            </CardActions>

    </Box>
    </div>
    
  );
}
