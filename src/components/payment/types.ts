import { Firebase } from "../../firebase";

export interface PaymentContainerProps {
  firebase: Firebase;
  isLoggedIn: boolean;
  userId: string;
  logout: () => void;
}

export interface Plan {
  title:string;
  name: string;
  description: string;
  description2:string;
  button:any;
  duration: number; //in days
  price: number;
}

export interface PaymentContainerState {
  checkout: boolean;
  currentPlan?: Plan;
  processing?: boolean;
  fail?: boolean;
  failMessage?: string;
  done?: boolean;
}
