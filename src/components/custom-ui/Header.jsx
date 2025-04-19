import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import authService from "@/backend-api/auth";
import { logout } from "@/store/features/authSlice";
import AvatarImageUser from "./UserProfile-Avatar";


export default function Header() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status);

    const handleLogout = async (e) => {
        try {
            const isLogout = await authService.logout();
            if(isLogout) dispatch(logout());
        } catch (error) {
            console.log("Error while logging out!", error.message);
            
        }
    } 

    return (
        <header className="bg-background text-foreground">
            <nav className="border-b">
            <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
                <Link to="/blog">
                  <Logo className="w-18 h-10 md:w-22 md:h-12"/>
                </Link>

                <div className="flex items-center gap-2 md:gap-5">

                <div className="hidden md:flex items-center justify-center gap-5">

                {status ? ( <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                onClick={handleLogout}
                >
                    Logout
                </Button>
                ) : (
                <Link to="/login">
                <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                >
                    Login
                </Button>
                </Link>
                )
                }

                {status &&
                <Link to="/add-post">
                <Button
                size="lg"
                className="cursor-pointer"
                >
                    Add Post
                </Button>
                </Link>
                }
                </div>

                <div className="flex items-center justify-center">
                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-5 md:hidden">
                
                {status ? (
                    <AvatarImageUser />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                            variant="ghost" 
                            size="sm"
                            className="inline-flex md:hidden cursor-pointer">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link to="/login">Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/signup">Signup</Link>
                        </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                )}
            
                    
                </div>

                <div className="hidden md:flex items-center justify-center">
                {status && <AvatarImageUser />}
                </div>

                </div>

            </div>
            </div>
            </nav>
        </header>
    )
}