export class AuthService {

    async createAccount({email, password, name}) {
        try {
            const response = await fetch("http://localhost/blog-api/signup", {
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
            const response = await fetch("http://localhost/blog-api/login", {
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
            const response = await fetch("http://localhost/blog-api/user", {
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
            const response = await fetch("http://localhost/blog-api/logout", {
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
}

const authService = new AuthService();
export default authService;