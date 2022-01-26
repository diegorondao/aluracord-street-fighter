import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { React, useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function handleNewMessage(newMessage) {
    const mensagem = {
      id: messageList.lenght + 1,
      from: "Diego Rondão",
      text: newMessage,
    };

    setMessageList([mensagem, ...messageList]);
    setMessage("");
  }

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/11/street-fighter-v-suzaku-castle-stage.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "1px solid red",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "1px solid red",
          }}
        >
          <MessageList mensagem={messageList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              type="textarea"
              placeholder="Insira sua mensagem aqui..."
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          colorVariant="primary"
          label="Logout"
          href="/"
          styleSheet={{
            resize: "none",
            color: appConfig.theme.colors.neutrals["050"],
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagem.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/diegorondao.png`}
              />
              <Text tag="strong">{mensagem.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.text}
          </Text>
        );
      })}
    </Box>
  );
}
