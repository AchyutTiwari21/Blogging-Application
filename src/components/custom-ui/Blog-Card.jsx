import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  UserRound,
  Send,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
  MessageCircleMore,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast";
import service from "@/backend-api/configuration";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "@/store/features/postSlice";
import parse from "html-react-parser";


export function BlogCard({Id,Title, AuthorName, AuthorProfileImage, AuthorDesignation, Description, FeaturedImage, Likes, Comments = [], HasLiked}) {
  const [liked, setLiked] = useState(HasLiked);
  const [likesCount, setLikesCount] = useState(Likes);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState(Comments);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFullPostOpen, setIsFullPostOpen] = useState(false);
  // const { toast } = useToast();

  function truncateHTML(html, wordLimit) {
    const text = html.replace(/<[^>]+>/g, ""); // Remove HTML tags
    const words = text.split(/\s+/).slice(0, wordLimit); // Get first 50 words
    return words.join(" ") + "...";
  }

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const handleLike = async () => {
    if (liked) {
      try {
        const isUnliked = await service.unlikePost({id: Id});
        if(isUnliked) {
          setLikesCount((prev) => prev-1);
          dispatch(likePost({Id, HasLiked: !liked}))
        }
        else throw new Error("Unable to unlike Post")
      } catch (error) {
        console.log(error.message || "Unable to unlike the post.");
        return;
      }
    } 
    
    else {
      try {
        const isLiked = await service.likePost({id: Id});
        if(isLiked) {
          setLikesCount((prev) => prev+1);
          dispatch(likePost({Id, HasLiked: !liked}));
        }
        else throw new Error("Unable to like Post")
      } catch (error) {
        console.log(error.message || "Unable to like the post.");
        return;
      }
    }
    setLiked(!liked);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const commentId = await service.commentPost({id: Id, comment: newComment});
        if(commentId) {
          setComments(prev => [...prev, {Id: commentId, Comment: newComment, CommenterName: userData.Name, CommenterProfileImage: userData.ProfileImage}]);
          setNewComment("");
        }
        else {
          throw new Error("Error while Adding Comment.")
        }
      } catch (error) {
        console.log(error.message || "Error while Commenting Post.");
        return;
      }
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing blog post: ${Description.substring(0, 50)}...`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setIsShareOpen(false);
  };

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="flex justify-between space-y-0">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={AuthorProfileImage} alt={AuthorName} />
            <AvatarFallback>
              <UserRound className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold hover:underline cursor-pointer">
              {AuthorName}
            </p>
            <p className="text-sm text-muted-foreground">{AuthorDesignation}</p>
          </div>
        </div>

        <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <span className="w-full font-bold">{Title}</span>
          <p className="text-sm">
            {truncateHTML(Description, 50)}
          </p>
        </div>
        {FeaturedImage && (
          <div>
            <img
              src={FeaturedImage}
              alt={`Blog content id: ${Id}`}
              className="rounded-lg w-full h-84 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsFullPostOpen(true)}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col">
        <div className="flex items-center gap-2 w-full text-sm text-muted-foreground mb-2">
          <Heart className={`h-4 w-4 ${liked ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
          <span>{likesCount} likes</span>
          <span>•</span>
          <span>{comments.length} comments</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between w-full pt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex-1 ${liked ? "text-red-500" : ""} cursor-pointer`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 mr-2 ${liked ? "fill-current" : ""}`} />
            <span className="hidden md:inline">Like</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 cursor-pointer"
            onClick={() => setIsCommentOpen(true)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Comment</span>
          </Button>
          <DropdownMenu open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-1 cursor-pointer">
                <Share2 className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('instagram')}>
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 cursor-pointer"
            onClick={() => setIsFullPostOpen(true)}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Read</span>
          </Button>
        </div>
      </CardFooter>

      <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.Id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.CommenterProfileImage} alt={comment.CommenterName} />
                  <AvatarFallback>
                    <UserRound className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm">{comment.CommenterName}</p>
                  </div>
                  <p className="text-sm mt-1">{comment.Comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <Button onClick={handleAddComment} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFullPostOpen} onOpenChange={setIsFullPostOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={AuthorProfileImage} alt={AuthorName} />
                <AvatarFallback><UserRound /></AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{AuthorName}</DialogTitle>
                <p className="text-sm text-muted-foreground">{AuthorDesignation}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <span className="w-full font-bold">{Title}</span>
            <p className="text-base leading-relaxed">{parse(Description)}</p>
              {FeaturedImage && <div>
                  <img
                    src={FeaturedImage}
                    alt={`Blog content id: ${Id}`}
                    className="rounded-lg w-full object-cover"
                  />
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}