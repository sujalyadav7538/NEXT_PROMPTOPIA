/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Prompts = ({ post, setPost ,isSuggested}) => {
  const [suggestedTags, setSuggestedTags] = useState([
    "Development",
    "DSA",
    "CODING",
    "CP",
  ]);

  const handleTags = (e) => {
    const newTag = e.target.innerText;

    setPost((prevPost) => ({
      ...prevPost,
      tag: prevPost.tag.includes(newTag)
        ? prevPost.tag
        : [...(prevPost.tag || []), newTag],
    }));
  };
  const handleRemoveTags=(newTag)=>{
    
    setPost((prevPost)=>{
        const tags=prevPost.tag;
        const newTags=tags.filter(tag=>tag!==newTag);
        return {...prevPost,tag:newTags};

    })
  };
  const getSuggestions=()=>{};

  return (
    <section className="flex h-full w-full gap-3 p-5">
      {isSuggested ? (
        suggestedTags.map((tag, index) => (
          <div
            key={index}
            className="uppercase text-sm font-medium text-gray-800 border-2 border-gray-700 border-opacity-20 p-1 rounded-xl cursor-pointer hover:bg-gray-700 hover:text-white hover:border-opacity-0 transition-all h-[30px] max-w-fit"
            onClick={(e) =>handleTags(e)}
          >
            {tag}
          </div>
        ))):
        (post.tag && post.tag.map((tag,index)=>(
            <div
            key={index}
            className="uppercase text-sm flex gap-2 items-center font-medium text-gray-800 border-2 border-gray-700 border-opacity-20 p-1 rounded-xl cursor-pointer hover:bg-gray-700 hover:text-white hover:border-opacity-0 transition-all h-[30px] max-w-fit"
          >
            {tag}
            <span>
              <RxCross2 onClick={()=>handleRemoveTags(tag)} key={index}/>
            </span>
          </div>
        )))
        }
    </section>
  );
};

export default Prompts;
