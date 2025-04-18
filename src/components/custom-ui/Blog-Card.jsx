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


export function BlogCard({ author, content, timestamp, stats, initialComments = [] }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(stats.likes);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFullPostOpen, setIsFullPostOpen] = useState(false);
  // const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: {
          name: "Current User",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
        },
        text: newComment,
        timestamp: "Just now",
      };
      setComments(prev => [...prev, comment]);
      setNewComment("");
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing blog post: ${content.text.substring(0, 50)}...`;
    
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

  const truncatedText = content.text.slice(0, 280);
  const hasMoreContent = content.text.length > 280;

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="flex justify-between space-y-0">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>
              <UserRound className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold hover:underline cursor-pointer">
              {author.name}
            </p>
            <p className="text-sm text-muted-foreground">{author.role}</p>
            <p className="text-sm text-muted-foreground">{timestamp}</p>
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
          <p className="text-sm">
            {isExpanded ? content.text : truncatedText}
            {hasMoreContent && !isExpanded && "..."}
          </p>
          {hasMoreContent && (
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <span className="flex items-center">
                  Show less <ChevronUp className="ml-1 h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center">
                  Show more <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              )}
            </Button>
          )}
        </div>
        {content.images && content.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {content.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Blog content ${index + 1}`}
                className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsFullPostOpen(true)}
              />
            ))}
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
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.image} alt={comment.author.name} />
                  <AvatarFallback>
                    <UserRound className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm">{comment.author.name}</p>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
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
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback><UserRound /></AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{author.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{author.role}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-base leading-relaxed">{content.text}</p>
            {content.images && (
              <div className="grid gap-4">
                {content.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Blog content ${index + 1}`}
                    className="rounded-lg w-full object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}