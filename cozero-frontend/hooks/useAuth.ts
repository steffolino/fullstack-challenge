import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth";
import { UserLoginDTO, UserRegistrationDTO } from "../interfaces/user.dto";
import LocalStorageService from "../services/LocalStorageService"
import UserService from "../services/UserService";

export const useAuth = () => {
    const { context, setContext } = useContext(AuthContext)
    const user = context?.user
    const navigate = useNavigate()

    const signIn = async (user: UserRegistrationDTO) => {
        
        /*
        message: "Unauthorized"
        statusCode: 401
        */
        const loggedUser:UserLoginDTO | undefined = await UserService.login(user);

        debugger;
        setContext({
            ...context,
            user: loggedUser
        })
        LocalStorageService.setItem("user", loggedUser);

        //doesnt check for unauthorized msg when jwt undefined
        //{"statusCode":401,"message":"Unauthorized"}	
        if (loggedUser) {
            navigate('/')
            return;
        }

        return null
    }

    const signUp = useCallback(async (user: UserRegistrationDTO) => {
        const createdUser = await UserService.register(user);
        if (createdUser) {
            LocalStorageService.setItem("user", createdUser);
        }

        setContext({
            ...context,
            user: createdUser
        })

        navigate('/')
        return createdUser;
    }, []);

    const signOut = () => {
        setContext({
            ...context,
            user: undefined
        })

        LocalStorageService.removeItem("user");
        navigate('/')
    }

    useEffect(() => {
        const user = LocalStorageService.getItem<UserLoginDTO>('user');
        if (user) {
            setContext({
                ...context,
                user
            })
        }
    }, []);

    useEffect(() => {
        if (!user) {
            LocalStorageService.removeItem("user")
            return
        }

        LocalStorageService.setItem("user", user);
    }, [user])


    return { user, logIn: signIn, signOut, signUp };
}