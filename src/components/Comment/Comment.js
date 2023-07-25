import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import React from 'react'

import { cyan,lightBlue,blueGrey } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function Comment(props) {
  const {comment} = props
  
  const [commentLiked, setCommentLiked] = React.useState({});
  const handleCommentLike = (commentId) => {
    setCommentLiked((prevLiked) => ({
      ...prevLiked,
      [commentId]: !prevLiked[commentId],
    }));
  };
  return (
    <Card key={comment.id} sx={{ border: '1px solid #f8f8f8' }}>
    {/* Comment Header */}
    <CardHeader
   
      avatar={
        <a
          href={`/user/${comment.user.userId}`}
          style={{ textDecoration: 'none' ,}}
        >
          <Avatar
            sx={{ bgcolor: cyan[500] }}
            aria-label="recipe"
          >
            {comment.user.userName.charAt(0).toUpperCase()}
          </Avatar>
        </a>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={comment.user.userName}
      subheader={comment.createdDate}
     
    />

    <Divider />

    {/* Comment Content */}
    <CardContent sx={{ flex: '1 0 auto', margin: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: 1,
          pb: 1,
          justifyItems: 'center',
        }}
      >
        {comment.text}
      </Box>
    </CardContent>

    <CardActions disableSpacing>
      {/* Like Button */}
      <IconButton
        onClick={() => handleCommentLike(comment.id)}
        aria-label="add to favorites"
      >
        <FavoriteIcon
          style={
            commentLiked[comment.id] ? { color: 'red' } : null
          }
        />
      </IconButton>

      {/* Share Button */}
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>
  )
}
