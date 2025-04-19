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
import { useSelector, useDispatch } from 'react-redux';
import config from '@/config/config';
import configService from "../backend-api/configuration";
import { useNavigate } from 'react-router-dom';
import { addPost } from '@/store/features/postSlice';
import ImageUploader from '@/backend-api/fileUpload';

function AddPostPage() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      content: '',
      category: '',
      image: null,
      featuredImage: null
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    try {
      const post = await configService.createPost({...data, userId: userData.id});
      if(post) {
        dispatch(addPost(post));
        navigate("/blog");
      } else {
        throw new Error("Unable to upload post.");
      }
    } catch (error) {
      console.log("Post upload error: ", error.message); 
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
              Add Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AddPostPage; 