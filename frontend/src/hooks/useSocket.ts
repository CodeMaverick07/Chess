import { useEffect, useState } from "react";
import { useUser } from "../store/hooks/useUser";

const WS_URL = import.meta.env.VITE_APP_WS_URL;

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const user = useUser();

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(`${WS_URL}?token=${user.token}`);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  return socket;
};
