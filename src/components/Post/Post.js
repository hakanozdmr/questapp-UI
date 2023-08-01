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
import { cyan,lightBlue,blueGrey, red, green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Divider, Menu, MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';
import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';
import ReportIcon from '@mui/icons-material/Report';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { DeleteWithAuth, PostWithAuth } from '../../services/HttpService';
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

export default function Post(props) {
  const { post } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [likeId, setLikeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let disabled = localStorage.getItem("currentUser") == null ? true:false;
  const theme = useTheme();
  const navigate = useNavigate();

  console.log(localStorage.getItem("currentUser"))

  const deletePost = () => {
    DeleteWithAuth("/posts?id="+post.id)
      .then((res) => navigate(0))
      .catch((err) => console.log(err))
  }

  const setCommentRefresh = () => {
    setRefresh(true);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const refreshComments = () => {
    fetch("/comments?postId="+post.id)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setCommentList(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )

    setRefresh(false)
  }
 

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }
      
   }

   const saveLike = () => {
    PostWithAuth("/likes",{
      postId: post.id, 
      userId : localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  const deleteLike = () => {
    DeleteWithAuth("/likes?id="+likeId)
      .catch((err) => console.log(err))
  }
 

  const checkLikes = () => {
    var likeControl = post.likes.find((like =>  ""+like.userId === localStorage.getItem("currentUser")));
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }
  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [refresh])

  useEffect(() => {checkLikes()},[])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ width: 800, maxWidth: 800, margin: '10px' }}>
      {/* Card Header */}
      <CardHeader
         sx={{
          background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);',
        }}
        avatar={
          <a href={`/user/${post.userId}`} style={{ textDecoration: 'none' }}>
            <Avatar sx={{ bgcolor: blueGrey.A700 }} aria-label="recipe">
              {post.userUserName.charAt(0).toUpperCase()}
            </Avatar>
          </a>
        }
        action={
          <div>
            <IconButton aria-label="settings"    id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            { localStorage.getItem("currentUser") === post.userId.toString() ? 
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
           
            <MenuItem  sx={{ color: green[500] }} onClick={handleClose}> <EditIcon></EditIcon> Edit Post</MenuItem>
            <MenuItem sx={{ color: red[500] }}  onClick={deletePost}> <ClearIcon></ClearIcon> Delete Post</MenuItem>
          </Menu> : 
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem sx={{ color: red[500] }}  onClick={handleClose}> <ReportIcon></ReportIcon>  Şikayet Et</MenuItem>
          </Menu>}
          
        </div>
          // <IconButton aria-label="settings">
          //   <MoreVertIcon />
          // </IconButton>
        }
        title={post.userUserName}
        // subheader={post.createdDate}
        subheader="@nickname"
      />

      <Divider />

      <CardContent>
        {/* Card Content */}
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {post.text}
        </Typography>
        <Typography variant="h12" color="text.secondary">
          {post.createdDate}
        </Typography>
      </CardContent>

      <Divider />
      <CardContent>
        <Typography variant="h12" color="text.secondary">
          <span style={{fontWeight:'bold'}} >{post.comments.length} </span> Yorum
        </Typography>
        <Typography variant="h12" color="text.secondary">
          <span style={{fontWeight:'bold'}}> {likeCount} </span> Beğeni
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
      {disabled ?                    
                  <IconButton 
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton 
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton>
      }

        {/* Share Button */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        {/* Expand Comments Button */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
     { disabled ? null : <CommentForm postId={post.id} userId={localStorage.getItem('currentUser')} setCommentRefresh={setCommentRefresh} />}
        {/* Comments */}
        {post.comments.map((comment) => (
           <Comment key={comment.id} comment={comment} ></Comment>
        ))}
      </Collapse>
    </Card>
  );
}
