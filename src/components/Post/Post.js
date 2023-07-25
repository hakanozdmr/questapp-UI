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
import { cyan,lightBlue,blueGrey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Divider } from '@mui/material';

import Link from '@mui/material/Link';
import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

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
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
 

  const handleLike = () => {
    setLiked(!liked);
  };
  const handleCheckLike = () => {
    const liked = post.likes.some(like => like.userId === 2);
    setLiked(liked);
  };
  
useEffect(() => {
  handleCheckLike()
  }, [])


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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
          <span style={{fontWeight:'bold'}}> {post.likes.length} </span> Beğeni
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        {/* Like Button */}
        <IconButton onClick={handleLike} aria-label="add to favorites">
          <FavoriteIcon style={liked ? { color: 'red' } : null} />
        </IconButton>

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
      <CommentForm postId={post.id} userId={4} />
        {/* Comments */}
        {post.comments.map((comment) => (
           <Comment key={comment.id} comment={comment} ></Comment>
        ))}
      </Collapse>
    </Card>
  );
}
