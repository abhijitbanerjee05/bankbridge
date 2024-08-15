"use server"
import axios from "axios";
import { cookies } from 'next/headers'

axios.defaults.baseURL = 'http://ec2-3-149-233-160.us-east-2.compute.amazonaws.com:8080/api';

export const signIn = async () => {
    try {

    } catch (error) {
        console.log('Error', error)
    }
}

export const signUp = async (userData: SignUpParams): Promise<User> => {
    const signUpRequest = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        address1: userData.address1,
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalCode,
        dateOfBirth: userData.dateOfBirth,
        ssn: userData.ssn,
        email: userData.email,
        password: userData.password,
        phoneNumber: '8888888888'
    };

    const response = await axios.post("/create", signUpRequest);
    console.log(response.data);
    return response.data;
}

export const createLinkToken = async (): Promise<string> => {
    const response = await axios.get('/create-link-token');
    console.log(response.data.linkToken);
    return response.data.linkToken;
}

export const exchangePublicToken = async (publicToken: string) => {
    const user = await getGlobalUser();
    const exchangeRequest = {
        publicToken: publicToken,
        userId: user?.userId
    }
    console.log(exchangeRequest);
    const response = await axios.post("/exchange_token", exchangeRequest);
    console.log(response.data)
}

export const fetchAllTransactions = async (pageNumber: number, pageSize: number): Promise<TransactionsData> => {
    const user = await getGlobalUser();
    const transactionsRequest = {
        userId: user?.userId,
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: pageNumber,
        pageSize: pageSize
    }
    console.log(transactionsRequest);
    const response = await axios.post("/transactions", transactionsRequest);
    const transactionsData: TransactionsData = {
        transactions: response.data?.transactions,
        totalPages: response.data?.totalPages,
        totalTransactions: response.data?.totalTransactions
    }
    return transactionsData;
}

export const fetchAccountTransactions = async (account: Account, pageNumber: number, pageSize: number): Promise<TransactionsData> => {
    const user = await getGlobalUser();
    const transactionsRequest = {
        userId: user?.userId,
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: pageNumber,
        pageSize: pageSize,
        accountId: account.accountId
    }
    console.log(transactionsRequest)
    const response = await axios.post("/transactions", transactionsRequest);
    console.log(response.data.transactions);
    const transactionsData: TransactionsData = {
        transactions: response.data?.transactions,
        totalPages: response.data?.totalPages,
        totalTransactions: response.data?.totalTransactions
    }
    return transactionsData;
}

export const fetchBankAccounts = async (): Promise<Account[]> => {
    const user = await getGlobalUser();
    const userId = user?.userId;
    const response = await axios.get(`/accounts/${userId}`);
    console.log(response.data);
    return response.data?.accounts;
}

export const setGlobalUser = async (user: User) => {
    cookies().set('user', JSON.stringify(user))
    // localStorage.setItem('user', JSON.stringify(user));
};

export const getGlobalUser = async (): Promise<User | null> => {
    const userData = cookies().get('user')?.value;
    userData && console.log(JSON.parse(userData))
    return userData ? JSON.parse(userData) as User : null;
};

// Method to clear the user data from localStorage
export const clearGlobalUser = async () => {
    cookies().delete('user')
};
