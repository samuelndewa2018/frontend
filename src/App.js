import React, { useEffect, useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import Announcement from "./whatsapp";

function App() {
  const [qrCode, setQrCode] = useState("");
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch("http://localhost:3001/qr-code");
        const data = await response.text();
        setQrCode(data);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    const fetchClientStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/client-status"); // Replace with your server URL
        const data = await response.json();
        setIsClientReady(data.isClientReady);
        console.log("client", isClientReady);
      } catch (error) {
        console.error("Error fetching client status:", error);
      }
    };

    fetchQRCode();
    fetchClientStatus();

    const intervalId = setInterval(() => {
      fetchQRCode();
      fetchClientStatus();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
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
