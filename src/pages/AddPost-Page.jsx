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
// import poems from '../database/poems';
import { useSelector } from 'react-redux';
import config from '@/config/config';

function AddPostPage() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      content: '',
      category: '',
      image: null
    }
  });

  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = (data) => {
    console.log(data);

    // poems.push({
    //   id: Number(Math.random()*100),
    //   title: data.title,
    //   excerpt: data.content,
    //   imageUrl: "https://images.unsplash.com/photo-1518050947974-4be8c7469f0c?auto=format&fit=crop&q=80&w=800",
    //   author:{
    //     author: userData.image,
    //     avatar: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?auto=format&fit=crop&q=80&w=100",
    //   },
    //   likes: 128,
    //     comments: [
    //         {
    //             id: Number(Math.random()*100),
    //             content: "This poem is so beautiful!",
    //         },
    //         {
    //             id: Number(Math.random()*100),
    //             content: "This poem is so awesome!",
    //         }
    //     ],
    // })
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
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
                  onEditorChange={(content) => setValue('content', content)}
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