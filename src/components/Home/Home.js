import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import PostForm from '../Post/PostForm';
import Navbar from '../Navbar/Navbar';

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  let disabled = localStorage.getItem("currentUser") == null ? true:false;

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <Box sx={{ display: 'flex', flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: ' center', }}>
    <CircularProgress />
  </Box>;
  } else {
    return (
          <Box  sx={{
              backgroundColor: 'secondary',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: ' center',
              margin:0
              
            }}> 
           <Navbar />
           {disabled ? null :<Box sx={{margin:"5%"}}>
           <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  asdasssssssssdasd
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
           </Box> }
            <Stack >
           { disabled ? null : <PostForm postUserId={localStorage.getItem('currentUser')}  ></PostForm>}
            {postList.map(post => (
              <Post key={post.id} post={post} />
            ))}
            </Stack>
            aramabutonuyeri
            {disabled ? null :<Box sx={{margin:"5%"}}>
           <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  asdasssssssssdasd
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
           </Box> }
            </Box>
    );
  }
}
