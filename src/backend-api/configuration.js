export class Service{

    async createPost({title, content, featuredImage, status=true, userId}) {
        try {
            // backend api call to create post
        } catch (error) {
            console.log("Backend api service :: createPost :: error ", error);
        }
    }

    async updatePost(id, {title, content, featuredImage, status=true}) {
        try {
            // backend api call to update post
        } catch(err) {
            console.log("Backend api service :: updatePost :: error ", error);
        }
    }

    async deletePost(id) {
        try {
            // backend api call to delete post
        } catch(err) {
            console.log("Backend api service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(id) {
        try {
            // backend api call to get post
        } catch (err) {
            console.log("Backend api service :: getPost :: error ", error);
            return false;
        }
    }

    async getPosts() {
        try {
            // backend api call to get posts
        } catch (error) {
            console.log("Backend api service :: getPosts :: error ", error);
            return false;
        }
    }

    // file upload service

    async uploadImage(file) {
        try {
            // image upload to storage
        } catch (error) {
            console.log("Backend api service :: uploadImage :: error ", error);
            return false;
        }
    }

    async deleteImage(fileId) {
        try {
            // image deletion from storage
        } catch (error) {
            console.log("Backend api service :: deleteImage :: error ", error);
            return false;
        }
    }

    getImagePreview(fileId) {
        // get image url
    }
}


const service = new Service();
export default service;