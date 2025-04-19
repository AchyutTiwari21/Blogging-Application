import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configService from "../backend-api/configuration.js";
import Container from "@/components/custom-ui/Container.jsx";

const EditPostPage = () => {
    const [post, setPost] = useState(null);
    const { Id } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            if(Id) {
                const blogPost = await configService.getSinglePost(id=Id);
                if(blogPost) {
                    setPost(blogPost);
                }
            } else {
                navigate("/blog");
            }
        } catch (error) {
            console.log(error.message || "Error while fetching post");
            return;
        }
    }, [Id, navigate]);

    return ( post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div> ) : null
    );
}

export default EditPostPage;