import React, { useEffect, useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import Announcement from "./whatsapp";
import Video from "./Video";

function App() {
  const [qrCode, setQrCode] = useState("");
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch("http://localhost:3001/qr");

        const data = await response.text();
        console.log("this is ", data);
        setQrCode(data);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };
    const fetchSuccess = async () => {
      try {
        const response = await fetch("http://localhost:3001/sucess");
        const data = await response.text();
        setIsClientReady(data);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    // Call the fetchQRCode function here
    fetchQRCode();
    fetchSuccess();
  }, []);

  // useEffect(() => {
  //   socket.on("hello", (data) => {
  //     console.log("Server says:", data);
  //   });

  //   socket.on("qr", (data) => {
  //     const { qr } = data;
  //     console.log("the qr code is", qr);
  //     setQrCode(qr);
  //   });
  //   socket.on("clientReady", (data) => {
  //     const { isClientReady } = data;
  //     console.log("the client is", isClientReady);
  //     setIsClientReady(isClientReady);
  //   });
  // }, []);

  return (
    <div className="App">
      {/* {!isClientReady ? (
        <>
          <h1>WhatsApp Web Js</h1>
          <h1>Scan QR code</h1>
          <QRCode value={qrCode} />
        </>
      ) : (
        <Announcement />
      )} */}
      <>
        <h1>WhatsApp Web Js</h1>
        <h1>Scan QR code</h1>
        <QRCode value={qrCode} />

        {/* video starts here */}
        <Video />
      </>
    </div>
  );
}

export default App;
