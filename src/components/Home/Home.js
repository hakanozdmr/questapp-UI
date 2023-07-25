import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { Box, Stack } from '@mui/material';
import PostForm from '../Post/PostForm';

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

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
    return <div>Loading ...</div>;
  } else {
    return (

          <Box  sx={{
              backgroundColor: 'secondary',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: ' center',
              
            }}> 
           
            <Stack >
            <PostForm postUserId={2}  ></PostForm>
            {postList.map(post => (
              <Post key={post.id} post={post} />
            ))}
            </Stack></Box>
    );
  }
}
