"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import { string } from "zod";

axios.defaults.baseURL =
  "http://ec2-3-149-233-160.us-east-2.compute.amazonaws.com:8080/api";
// axios.defaults.baseURL = 'http://localhost:8080/api';

const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const signIn = async (
  userData: LoginUser
): Promise<User | undefined> => {
  try {
    const response = await axios.post("/auth/signin", userData);
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return undefined;
  }
};

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
    phoneNumber: userData.phoneNumber,
  };
  console.log(signUpRequest);

  const response = await axios.post("/auth/signup", signUpRequest);
  console.log(response.data);
  return response.data;
};

export const sendOtp = async (otpData: SendOTP) => {
  const response = await axios.post("/auth/sendOtp", otpData);
  console.log(response.data);
};

export const verifyUser = async (otpData: SendOTP): Promise<boolean> => {
  try {
    const response = await axios.post("/auth/verifyUser", otpData);
    if (response.status === 200) {
      console.log(response.data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error();
    return false;
  }
};

export const createLinkToken = async (): Promise<string> => {
  const response = await axios.get("/create-link-token");
  console.log(response.data.linkToken);
  return response.data.linkToken;
};

export const exchangePublicToken = async (publicToken: string) => {
  const user = await getGlobalUser();
  const exchangeRequest = {
    publicToken: publicToken,
    userId: user?.userId,
  };
  console.log(exchangeRequest);
  const response = await axios.post("/exchange_token", exchangeRequest);
  console.log(response.data);
};

export const fetchAllTransactions = async (
  pageNumber: number,
  pageSize: number,
  startDate: string,
  endDate: string
): Promise<TransactionsData> => {
  const user = await getGlobalUser();
  const transactionsRequest = {
    userId: user?.userId,
    startDate: startDate,
    endDate: endDate,
    pageNumber: pageNumber,
    pageSize: pageSize,
  };
  const response = await axios.post("/transactions", transactionsRequest);
  console.log(response.data.transactions);
  const transactionsData: TransactionsData = {
    transactions: response.data?.transactions,
    totalPages: response.data?.totalPages,
    totalTransactions: response.data?.totalTransactions,
  };
  return transactionsData;
};

export const fetchAccountTransactions = async (
  account: Account,
  pageNumber: number,
  pageSize: number
): Promise<TransactionsData> => {
  const user = await getGlobalUser();
  const transactionsRequest = {
    userId: user?.userId,
    startDate: "2024-01-01",
    endDate: getCurrentDateFormatted(),
    pageNumber: pageNumber,
    pageSize: pageSize,
    accountId: account.accountId,
  };
  console.log(transactionsRequest);
  const response = await axios.post("/transactions", transactionsRequest);
  console.log(response.data.transactions);
  const transactionsData: TransactionsData = {
    transactions: response.data?.transactions,
    totalPages: response.data?.totalPages,
    totalTransactions: response.data?.totalTransactions,
  };
  return transactionsData;
};

export const fetchBankAccounts = async (): Promise<Account[]> => {
  const user = await getGlobalUser();
  const userId = user?.userId;
  const accountsRequest = {
    userId: userId,
  };
  const response = await axios.post(`/accountSummary`, accountsRequest);
  console.log(response.data);
  return response.data?.accounts;
};

export const fetchAccountsData = async (
  startDate: string,
  endDate: string
): Promise<AccountsData> => {
  const user = await getGlobalUser();
  const userId = user?.userId;
  const accountsDataRequest = {
    userId: userId,
    startDate: startDate,
    endDate: endDate,
  };
  const response = await axios.post(`/accountSummary`, accountsDataRequest);
  console.log(response.data);
  return response.data;
};

export const setGlobalUser = async (user: User) => {
  cookies().set("user", JSON.stringify(user));
};

export const getGlobalUser = async (): Promise<User | null> => {
  const userData = cookies().get("user")?.value;
  userData && console.log(JSON.parse(userData));
  return userData ? (JSON.parse(userData) as User) : null;
};

export const clearGlobalUser = async () => {
  cookies().delete("user");
};
