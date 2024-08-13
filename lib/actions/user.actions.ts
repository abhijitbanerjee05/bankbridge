"use server"
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api';

export const signIn = async () => {
    try {
        
    } catch (error) {
        console.log('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        
    } catch (error) {
        console.log('Error', error)
    }
}

export const fetchAllTransactions = async (pageNumber : number, pageSize: number) : Promise<TransactionsData> => {
    const transactionsRequest = {
        userId: "d43cc601-df38-477e-8362-e85e51109690",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: pageNumber,
        pageSize: pageSize
    }
    const response = await axios.post("/transactions", transactionsRequest);
    console.log(transactionsRequest);
    const transactionsData : TransactionsData = {
        transactions : response.data?.transactions,
        totalPages : response.data?.totalPages,
        totalTransactions : response.data?.totalTransactions
    }
    return transactionsData;
}

export const fetchAccountTransactions = async (account : Account, pageNumber : number, pageSize: number) : Promise<Transaction[]> => {
    const transactionsRequest = {
        userId: "d43cc601-df38-477e-8362-e85e51109690",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: pageNumber,
        pageSize: pageSize,
        accountId: account.accountId
    }
    const response = await axios.post("/transactions", transactionsRequest);
    console.log(response.data.transactions);
    return response.data?.transactions;
}

export const fetchBankAccounts = async () : Promise<Account[]>=> {
    const userId = "d43cc601-df38-477e-8362-e85e51109690";
    const response = await axios.get(`/accounts/${userId}`);
    console.log(response.data);
    return response.data?.accounts;
}