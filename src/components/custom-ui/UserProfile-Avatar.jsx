import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/authSlice";
import authService from "@/backend-api/auth";
import {User} from "lucide-react";


export default function AvatarImageUser() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const handleLogout = async (e) => {
        try {
            const isLogout = await authService.logout();
            if(isLogout) dispatch(logout());
        } catch (error) {
            console.log("Error while logging out!", error.message);
            return;
        }
    } 

    return (
        
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src={userData.ProfileImage} alt="User" />
                <AvatarFallback>
                    <User className="h-8 w-8" />
                </AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">

            <DropdownMenuLabel>
            <Link to='/user-profile'>My Account</Link>
            </DropdownMenuLabel>
            <DropdownMenuItem>
                <Link to='/add-post'>Add Post</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={handleLogout}
            >
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}