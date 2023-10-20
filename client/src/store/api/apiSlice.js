import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL
})

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Accounts'],
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: (companyId) => `account-details?companyId=${companyId}`, 
            transformResponse: async (response) => {
                const {data} = response;
                const newData = data.map((row) => row.AccountNumber ? row : { ...row, AccountNumber: 'XXXX' });
                return newData;
            },
            providesTags: ['Accounts']
        }),

        getSelectAllAccountsValue: builder.query({
            query: () => '/get-selectall-accounts-value',
            transformResponse: (response) => {
                const {data} = response;
                console.log(data);
                return data.SelectAllValue;
            },
            providesTags: ['Accounts']
        }),

        changeAllAccountsAvailabilityStatus: builder.mutation({
            query: (body) => ({
                    url: '/change-all-accounts-availability-status',
                    method: 'POST',
                    body: body,
                }),
            invalidatesTags: ['Accounts']

        }),
        // addTodo: builder.mutation({
        //     query: (todo) => ({
        //         url: '/todos',
        //         method: 'POST',
        //         body: todo
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
        updateAccountStatus: builder.mutation({
            query: (body) => ({
                url: `/change-availablility-status`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Accounts']
        }),
        // deleteTodo: builder.mutation({
        // query: ({ id }) => ({
        //         url: `/todos/${id}`,
        //         method: 'DELETE',
        //         body: id
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
    })
})

export const {
    useUpdateAccountStatusMutation,
    useGetAccountsQuery,
    useGetSelectAllAccountsValueQuery,
    useChangeAllAccountsAvailabilityStatusMutation
} = apiSlice;