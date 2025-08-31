import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContextProvider";
import { ConnectedHeader } from "./ConnectedHeader/ConnectedHeader";
import { NotConnectedHeader } from "./NotConnectedHeader/NotConnectedHeader";

export function Header() {
  const { isConnected } = useContext(UserContext);
  return isConnected ? <ConnectedHeader /> : <NotConnectedHeader />;
}
