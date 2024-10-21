'use client'
import Link from "next/link";
import Prompts from "./Prompts";
import { useRef } from 'react';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  setIsSuggested,
  isSuggested,
}) => {
  const ref=useRef(null);
  const handleTag = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newTag = ref.current.value.trim(); // Get and trim the new tag value

    // Check if the new tag is valid
    if (newTag && newTag.length >= 2) {
      // Update post state
      setPost((prevPost) => ({
        ...prevPost,
        tag: prevPost.tag.includes(newTag)
          ? prevPost.tag // If tag already exists, keep the same array
          : [...(prevPost.tag || []), newTag], // Else, add the new tag
      }));

      ref.current.value = ""; // Clear the input field after adding the tag
    }
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <div className="flex gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="#Tag"
              className="form_input flex-1"
              ref={ref}
            />
            <button
              className="border-2 p-3 text-white  rounded-xl border-blue-700 bg-blue-500  text-sm font-medium"
              onClick={handleTag}
            >
              ADD TAG
            </button>
          </div>
        </label>
        {post.prompt && !isSuggested && (
          <div
            className="flex justify-center py-2 rounded-xl font-semibold text-white bg-green-600 cursor-pointer hover:bg-green-500"
            onClick={() => setIsSuggested(true)}
          >
            Suggest Prompts
          </div>
        )}
        <Prompts post={post} setPost={setPost} />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
