import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthCon {
  user: User;
  signUp: (obj: any) => Promise<true>;
  signIn: (uname: string, pass: string) => void;
  signOut: () => void;
  putIdPass: (id: string, pass: string) => void;
  portFolioAmt:number
}
interface User {
  aadhar_img: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  createdAt: string;
  demat_pdf_url: string;
  dob: string;
  email: string;
  experience: string;
  id: 3;
  income: string;
  isActive: boolean;
  isAuth?: boolean;
  isDeleted: boolean;
  name: string;
  phone_number: string;
  pincode: string;
  profession: string;
  profile_img: string;
  sign_img: string;
  state: string;
  updatedAt: string;
  userType: number;
  username: string;
  password: string;
  token: string;
  portFolioAmt:number
}
const appContext = createContext<AuthCon | null>(null);
export function ContextProvider({ children }: any) {
  const context = useContextProvided();
  //@ts-ignore
  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useAppContext = () => {
  return useContext(appContext);
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function useContextProvided() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [portFolioAmt, setPortFolioAmt] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("userCred").then((val) => {
      if (val) {
        const userCred = JSON.parse(val);
        signIn(userCred.username, userCred.password);
      }
    });
    
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    console.log(user?.token)
    axios
      .post(
        baseUrl + "admin/open_order/list",
        {},
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        }
      )
      .then((val) => {
        // console.log(val.data.data.data)
        var sum = 0;
        val.data.data.data.map((item: any) => {
          sum += Number(item.qty) * Number(item.strike_price);
        });
        setPortFolioAmt(sum)
        console.log(sum)
      });
  }, [user])
  
  const signUp = async (obj: any) => {
    const req = await axios.post(baseUrl + "admin/auth/register", {
      username: user?.username,
      password: user?.password,
      email: obj.email,
      name: obj.fname + " " + obj.lname,
      phone_number: obj.phone,
      profile_img: obj.imgLink,
      sign_img: obj.singLink,
      aadhar_img: obj.adLink,
      demat_pdf_url: obj.demLink,
      address_line_1: obj.addrLine1,
      address_line_2: obj.addrline2,
      city: obj.city,
      state: obj.state,
      pincode: obj.pinCode,
      profession: obj.profession,
      experience: obj.experience,
      income: obj.income,
      dob: obj.dob,
      isAuth: false,
    });
    // AsyncStorage.setItem("kycSubmit", "true");
    return req.data.status;
  };
  const signOut = async () => {
    await AsyncStorage.removeItem("userCred");
    setUser(undefined);
  };
  const signIn = (uname: string, pass: string) => {
    axios
      .post(baseUrl + "admin/auth/login", {
        username: uname,
        password: pass,
      })
      .then((val) => {
        if (val.data.status === "SUCCESS") {
          AsyncStorage.setItem(
            "userCred",
            JSON.stringify({
              username: uname,
              password: pass,
            })
          );
          console.log(val.data.data);
          setUser(val.data.data);
          // setUser({
          //   email: val.data.data.email,
          //   name: val.data.data.name ? val.data.data.name : "barfi",
          //   mobileNumber: val.data.data.mobileNo,
          //   city: val.data.data.city,
          //   address: val.data.data.address,
          //   number: val.data.data.number,
          //   username: val.data.data.username,
          // });
        }
      });
  };
  const putIdPass = (id: string, pass: string) => {
    //@ts-ignore
    setUser({
      username: id,
      password: pass,
      isAuth: "undefined",
    });
  };

  const setPortFolio = (amt) => {};
  return {
    user,
    signUp,
    putIdPass,
    signIn,
    signOut,
    portFolioAmt
  };
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
