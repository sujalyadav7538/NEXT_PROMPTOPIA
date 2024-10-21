"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
import Prompts from "@/components/Prompts";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: [] });
  const [isSuggested, setIsSuggested] = useState(false);

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(post.tag.length<=0) return console.log('Tags are Required')
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex w-full gap-10">
      <div className="h-[100vh]">
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPrompt}
          setIsSuggested={setIsSuggested}
          isSuggested={isSuggested}
        />
      </div>
      {isSuggested && (
        <div className="h-[100vh] pt-10">
          <h1 className="text-4xl font-semibold orange_gradient p-3">
            Suggested Prompts
          </h1>
          <Prompts post={post} setPost={setPost} isSuggested={isSuggested} />
        </div>
      )}
    </div>
  );
};

export default CreatePrompt;
