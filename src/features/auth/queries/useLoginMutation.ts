import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import AuthService  from "#/features/auth/services/authService";
import type { LoginCredentials, LoginResponse } from '#/features/auth/services/authService.ts'

export function useLoginMutation() {
    const navigate = useNavigate()

    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            navigate({to: "/my_courses"})
        }
    })
}