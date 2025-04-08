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


export default function AvatarImageUser() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status);

    const handleLogout = async (e) => {
        // try {
        //     const isLogout = await authService.logout();
        //     if(isLogout) dispatch(logout());
        // } catch (error) {
        //     console.log("Error while logging out!", error.message);
            
        // }
    } 

    return (
        
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">

            <DropdownMenuLabel>
            <Link to='/user-profile'>My Account</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={handleLogout}
            >
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}