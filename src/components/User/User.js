import React from 'react';
import { useParams } from 'react-router-dom';

export default function User() {
  const { userId } = useParams()
  const userObject = JSON.parse(localStorage.getItem("user"));
  return (
    <div>

      User {userId} 
      Bilgiler  {userObject.id}
    </div>
  );
}
