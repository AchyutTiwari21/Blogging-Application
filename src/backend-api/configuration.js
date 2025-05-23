export class Service{

    async createPost({title, description, featuredImage}) {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/create-post", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, description, featuredImage})
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while creating post.');
            } else {
                return data.post;
            } 
        } catch (error) {
            console.log("Backend api service :: createPost :: error ", error);
        }
    }

    async updatePost({id, title, description, featuredImage}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/update-post/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, description, featuredImage})
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while updating post.');
            } else {
                return true;
            } 
        } catch(err) {
            console.log("Backend api service :: updatePost :: error ", error);
        }
    }

    async deletePost({id}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/blog-api/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while deleting post.');
            } else {
                return true;
            }
        } catch(err) {
            console.log("Backend api service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPosts() {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/posts", {
                method: 'GET',
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while fetching post.');
            } else {
                return data.posts;
            }
        } catch (error) {
            console.log("Backend api service :: getPosts :: error ", error.message);
            return false;
        }
    }

    async getSinglePost({id}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/post/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while fetching post.');
            } else {
                return data;
            }
        } catch (error) {
            console.log("Backend api service :: getSinglePost :: error ", error.message);
            return false;
        }
    }

    async likePost({id}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/like-post/${id}`, {
                method: 'POST',
                credentials: 'include',
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while liking post.');
            } else {
                return true;
            }
        } catch (error) {
            console.log("Backend api service :: likePosts :: error ", error);
            return false;
        }
    }

    async unlikePost({id}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/unlike-post/${id}`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Error while unliking the post.');
            } else {
                return true;
            }
        } catch (error) {
            console.log("Backend api service :: unlikePosts :: error ", error);
            return false;
        }
    }

    async commentPost({id, comment}) {
        try {
            const response = await fetch(`https://blog-api-2n8t.onrender.com/comment-post/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({comment})
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while commenting post.');
            } else {
                return data.commentId;
            }
        } catch (error) {
            console.log("Backend api service :: commentPost :: error ", error);
            throw error;
        }
    }

    async getUserPosts() {
        try {
            const response = await fetch('https://blog-api-2n8t.onrender.com/user-posts', {
                method: 'GET',
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if(!response.ok) {
                throw new Error(data.error || 'Error while fetching post.');
            } else {
                return data.posts;
            }
        } catch (error) {
            console.log("Backend api service :: getUserPosts :: error ", error.message);
            return false;
        }
    }
}


const service = new Service();
export default service;