"use server"
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/user-service';

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

export const fetchTransactions = async () : Promise<Transaction[]> => {
    const transactionsRequest = {
        userId: "d43cc601-df38-477e-8362-e85e51109690",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: 1
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