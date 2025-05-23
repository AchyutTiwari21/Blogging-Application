export class AuthService {

    async createAccount({email, password, name}) {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/signup", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password})
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Error while creating Account.');
            } else {
                const isLogin = await this.login({email, password});
                if(isLogin) return true;
            }   

        } catch (error) {
            console.log('Error while signing up.');
            throw error;
        }
    }
      
    async login({email, password}) {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/login", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Invalid email and/or password!');
            } else {
                return true;
            }   

        } catch(error) {
            console.log('Error while logging in.');
            throw error;  
        }
    }

    async getCurrentUser() {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/user", {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || "Error while fetching user details.")
            } else {
                return data;
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const response = await fetch("https://blog-api-2n8t.onrender.com/logout", {
                method: 'POST',
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error('Error while logging out');
            } else {
                return true;
            }
        } catch (error) {
            console.log('Error while logging out.'); 
            throw error;
        }
    }

    async updateUserDetails({profileImage, designation}) {
        try {
            const response = await fetch('https://blog-api-2n8t.onrender.com/update-user', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include', // Important to send cookies
                body: JSON.stringify({
                  profileImage,
                  designation
                }),
              });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Error while creating Account.');
            } else {
                return data.user;
            }   

        } catch (error) {
            console.log('Error while updating user.');
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;