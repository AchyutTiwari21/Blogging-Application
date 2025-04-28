import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Upload, User, X, Camera, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import authService from "@/backend-api/auth";
import {updateUser} from "../store/features/authSlice";
import ImageUploader from "@/backend-api/fileUpload";
import service from "@/backend-api/configuration";
import parse from "html-react-parser";
import { removePost } from "@/store/features/postSlice";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample user blogs
  const [userBlogs, setUserBlogs] = useState([
    {
      id: "1",
      title: "Getting Started with React and TypeScript",
      excerpt: "A comprehensive guide to using TypeScript with React...",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Modern CSS Techniques",
      excerpt: "Exploring the latest CSS features and best practices...",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const blogs = await service.getUserPosts();
        setUserBlogs(blogs);
      } catch (error) {
        console.log(error.message || "Error while fetching post.");
      } finally {
        setLoading(false);
      }
    })()
  }, [userBlogs]);
 
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const [profileImage, setProfileImage] = useState(userData?.ProfileImage || null);
  const [designation, setDesignation] = useState(userData?.Designation || null);

  const handlePhotoUpload = async(event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const imageUrl = await ImageUploader(file);
      
      if (imageUrl) {
        setProfileImage(imageUrl);
      } 
    } catch (error) {
      console.log("Upload Image Error: ", error.message);
      return;
    }
  };

  const handleSave = async() => {
    try {
      const userDetails = await authService.updateUserDetails({profileImage, designation});
      if(userDetails) {
        dispatch(updateUser({ProfileImage: profileImage, Designation: designation}));
      } else {
        throw new Error("Error while saving the post.")
      }
    } catch (error) {
      console.log("Error while saving the post." || error.message);
      return;
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteBlog = async () => {
    if (selectedBlog) {
      const id = selectedBlog.Id;
      try {
        const isRemoved = await service.deletePost({id});
        if(isRemoved) {
          dispatch(removePost({Id: id}));
          setUserBlogs(userBlogs.filter(blog => blog.Id !== selectedBlog.Id));
        }
        setDeleteDialogOpen(false);
        setSelectedBlog(null);
      } catch (error) {
        console.log(error.message || "Error while deleting the blog post.");
      }
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditingBlog(true);
  };

  const handleSaveBlog = (updatedBlog) => {
    setUserBlogs(userBlogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    ));
    setIsEditingBlog(false);
    setSelectedBlog(null);
  };

  if(loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="space-y-8 py-4 px-2">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
            >
              <Avatar className="h-32 w-32">
                <AvatarImage src={userData.ProfileImage} alt={userData.Name} />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              {isHoveringPhoto && !isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold">{userData.Name}</h2>
              <p className="text-muted-foreground">{userData.Designation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User's Blog Posts */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">My Blog Posts</h3>
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userBlogs.map((blog) => (
              <div key={blog.Id} className="flex gap-4 group">
                {blog.FeaturedImage && (
                  <img
                    src={blog.FeaturedImage}
                    alt={blog.Title}
                    className="w-32 h-24 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{blog.Title}</h4>
                      <p className="text-sm text-muted-foreground">{parse(blog.Description)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBlog(blog)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={profileImage}
                    alt={userData.Name}
                  />
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
          </div>

            <div className="space-y-4">
              <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditingBlog} onOpenChange={setIsEditingBlog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedBlog?.title}
                onChange={(e) =>
                  setSelectedBlog(prev => prev ? { ...prev, title: e.target.value } : null)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={selectedBlog?.excerpt}
                onChange={(e) =>
                  setSelectedBlog(prev => prev ? { ...prev, excerpt: e.target.value } : null)
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditingBlog(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedBlog && handleSaveBlog(selectedBlog)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBlog} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}