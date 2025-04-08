export class AuthService {

    async createAccount({email, password, name}) {
        try {
            // backend api call to create account
        } catch (error) {
        }
    }

    async login({email, password}) {
        try {
            // backend api call to login account
        } catch(error) {
        }
    }

    async getCurrentUser() {
        try {
            // backend api call to get current user account
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            // backend api call to logout current user account
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;