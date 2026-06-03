import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {getCookie, setCookie} from "@tanstack/react-start/server"



export async function getRefreshToken(): Promise<string | undefined> {
  const refreshCookie = getCookie("refresh_token");
  return refreshCookie
}


export const grapCookie = createServerFn().handler(async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw redirect({to: "/login" })
  }

  setCookie("refresh_token", refreshToken)
  console.log(refreshToken)
  
  return refreshToken

    
});