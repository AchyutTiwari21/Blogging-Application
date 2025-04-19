import PostForm from "@/components/custom-ui/Post-Form";
import Container from "@/components/custom-ui/Container";
import React from "react";

export default function AddPostPage() {
  return (
    <div className="py-8">
      <Container>
          <PostForm />
      </Container>
    </div>
  )
}