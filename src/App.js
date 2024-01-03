import React, { useEffect, useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import Announcement from "./whatsapp";
const socket = io.connect("http://localhost:3001", {});

function App() {
  const [qrCode, setQrCode] = useState("");
  const [isClientReady, setIsClientReady] = useState(false);

  // useEffect(() => {
  //   const fetchQRCode = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/qr-code");
  //       const data = await response.text();
  //       setQrCode(data);
  //     } catch (error) {
  //       console.error("Error fetching QR code:", error);
  //     }
  //   };

  useEffect(() => {
    socket.on("hello", (data) => {
      console.log("Server says:", data);
    });

    socket.on("qr", (data) => {
      const { qr } = data;
      console.log("the qr code is", qr);
      setQrCode(qr);
    });
    socket.on("clientReady", (data) => {
      const { isClientReady } = data;
      console.log("the client is", isClientReady);
      setIsClientReady(isClientReady);
    });
  }, []);

  return (
    <div className="App">
      {!isClientReady ? (
        <>
          <h1>WhatsApp Web Js</h1>
          <h1>Scan QR code</h1>
          <QRCode value={qrCode} />
        </>
      ) : (
        <Announcement />
      )}
    </div>
  );
}

export default App;
