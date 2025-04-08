import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { login as authLogin } from "../store/features/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/custom-ui/Logo";
import { useDispatch } from "react-redux";
import authService from "../backend-api/auth";
import {useForm} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, formState: { errors }, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const login = async(data) => {
        setError("");
        // try {
        //     const session = await authService.login(data);
        //     if(session) {
        //         const userData = await authService.getCurrentUser();
        //         console.log(userData);
                
        //         if(userData) dispatch(authLogin({userData}));
        //         navigate("/blog");
        //     }
        // } catch (error) {
        //     setError(error.message);
        // }

        dispatch(authLogin({userData}));
        navigate("/blog");
    }

    return (
        <div
        className='h-auto w-full bg-background flex justify-center px-5 my-10'
        >
            <div className={`mx-auto w-full max-w-lg bg-card text-card-foreground rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-card-foreground/80">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5 flex flex-col items-center justify-center">

                    <div className="w-full">
                    <label className="inline-block mb-1 pl-1"
                    htmlFor="email"
                    > 
                    Email:
                    </label>
                    <Input
                    placeholder="Enter your email"
                    id="email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })} 
                    />
                    <ErrorMessage errors={errors} name="email" />

                    <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p>{message}</p>}
                    />
                    </div>

                    <div className="w-full">
                    <label className="inline-block mb-1 pl-1"
                    htmlFor="password"
                    > 
                    Password:
                    </label>
                    <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })} 
                    />
                    </div>

                    <Button 
                    type="submit"
                    className="w-full cursor-pointer"
                    > 
                    Login
                    </Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LoginPage;