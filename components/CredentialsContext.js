import { createContext } from "react";

//  Credential Context
export const CredentialsContext = createContext({storedCredentials: {}, setStorageCredentials: () => {} })