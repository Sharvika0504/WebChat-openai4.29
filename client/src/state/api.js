import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postLogin: build.mutation({ 
            query :  (payload) => ({
                url: "auth/login",
                method: "POST",
                body: payload,
            }),
        }),
        postSignup: build.mutation({ 
            query :  (payload) => ({
                url: "auth/signup",
                method: "POST",
                body: payload,
            }),
        }),
        postAiText: build.mutation({ //endpoint to make  API request at  - not the actual  API it is the function that calls the API
            query :  (payload) => ({
                url: "openai/text",
                method: "POST",
                body: payload,
            }),
        }),
        postAiCode: build.mutation({ //endpoint to make  API request at  - not the actual  API it is the function that calls the API
            query :  (payload) => ({
                url: "openai/code",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});


export const{ // hook to call API
    usePostLoginMutation, usePostSignupMutation, usePostAiTextMutation, usePostAiCodeMutation
} = api;