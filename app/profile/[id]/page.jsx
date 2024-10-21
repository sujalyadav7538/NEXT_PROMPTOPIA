/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = ({params}) => {

  const [usersPosts, setUsersPosts] = useState([]);
  const SearchParams=useSearchParams();
  const name=SearchParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUsersPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={name}
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={usersPosts}
    />
 
  );
};

export default UserProfile;