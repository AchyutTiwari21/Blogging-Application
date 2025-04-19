import { BlogCard } from "@/components/custom-ui/Blog-Card";
import { useEffect } from "react";
import service from "@/backend-api/configuration";
import { useDispatch, useSelector } from "react-redux";
import { initPosts } from "../store/features/postSlice";

const sampleBlogs = [
  {
    author: {
      name: "Sarah Wilson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      role: "Senior Content Writer",
    },
    content: {
      text: "Just finished writing a comprehensive guide on effective storytelling in digital marketing. Here are some key insights on how to engage your audience through compelling narratives...",
      images: [
        "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80",
      ],
    },
    timestamp: "2h ago",
    stats: {
      likes: 142,
      comments: 28,
    },
    initialComments: [
      {
        id: "1",
        author: {
          name: "John Doe",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
        },
        text: "This is exactly what I needed! The storytelling techniques you shared are brilliant.",
        timestamp: "1h ago",
      },
      {
        id: "2",
        author: {
          name: "Emma Thompson",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
        },
        text: "Would love to see more examples of these principles in action!",
        timestamp: "30m ago",
      },
    ],
  },
  {
    author: {
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      role: "Tech Blogger",
    },
    content: {
      text: "Exploring the future of AI in content creation. The possibilities are endless, but we must also consider the ethical implications...",
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80",
      ],
    },
    timestamp: "5h ago",
    stats: {
      likes: 89,
      comments: 15,
    },
    initialComments: [
      {
        id: "1",
        author: {
          name: "Alice Johnson",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
        },
        text: "The ethical considerations you raised are crucial. We need more discussions about AI responsibility.",
        timestamp: "3h ago",
      },
    ],
  },
];

function BlogPage() {
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const blogPosts = await service.getPosts();
      dispatch(initPosts(blogPosts));
    } catch (error) {
      console.log(error.message || "Error while fetching post.");
      return;
    }
  }, []);

  const blogPosts = useSelector(state => state.post.posts);

  return (
    <div className="min-h-screen bg-background">

      {/* Blog Feed Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-8">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.Id} {...blog} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default BlogPage;;