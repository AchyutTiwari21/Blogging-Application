import React from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import config from '@/config/config';
import configService from "../../backend-api/configuration";
import { useNavigate } from 'react-router-dom';
import { addPost, updatePost } from '@/store/features/postSlice';
import ImageUploader from '@/backend-api/fileUpload';

function PostForm({post}) {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.Title || '',
      description: post?.Description || '',
      featuredImage: post?.FeaturedImage || null,
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    if(post) {
      try {
        const blogPost = await configService.updatePost({...data, id: post.Id});
        if(blogPost) {
          dispatch(updatePost({Id: post.Id, ...data}));
          navigate("/blog");
        } else {
          throw new Error("Unable to update the post.");
        }
      } catch (error) {
        console.log("Post update error: ", error.message); 
        return;
      }
    }

    else {
      try {
        const blogPost = await configService.createPost({...data});
        if(blogPost) {
          dispatch(addPost(blogPost));
          navigate("/blog");
        } else {
          throw new Error("Unable to upload post.");
        }
      } catch (error) {
        console.log("Post upload error: ", error.message); 
        return;
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if(!file) {
      return;
    }
    try {
      const imageUrl = await ImageUploader(file);
      if (imageUrl) {
        setValue('featuredImage', imageUrl);
      } 
    } catch (error) {
      console.log("Upload Image Error: ", error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-card-foreground">
              Add New Blog Post
            </CardTitle>
            <CardDescription className="text-card-foreground">
               Share your thoughts with the world.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-card-foreground">
                  Title
                </Label>
                <Input
                  id="title"
                  {...register('title')}
                  className="w-full"
                  placeholder="Add a title"
                />
              </div>

              {/* TinyMCE Editor */}
              <div className="space-y-2">
                <Label className="text-card-foreground">
                  Blog Post
                </Label>
                <Editor
                  apiKey={config.apiKey}
                  initialValue={getValues('description')}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family: "Noto Sans Devanagari", sans-serif; font-size: 16px; }'
                  }}
                  onEditorChange={(description) => setValue('description', description)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-200">
                  Images
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full cursor-pointer"
            >
              {post ? (<span>Edit Post</span>) : (<span>Add Post</span>)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PostForm; 