import { useEffect, useState } from "react";
import { get } from "browser-cookies";
export const useUserIp = () => {
  const [ip, setUserIp] = useState<string>("");
  useEffect(() => {
    const userIp = get("user-ip") ?? "";
    setUserIp(userIp);
  }, []);

  return ip;
};
