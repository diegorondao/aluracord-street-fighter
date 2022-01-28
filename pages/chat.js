import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import { useRouter } from 'next/router';
import appConfig from "../config.json";
import { createClient} from "@supabase/supabase-js";
import {ButtonSendSticker} from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MDMzNywiZXhwIjoxOTU4ODY2MzM3fQ.3CkbQIWSPMWVXOCuFx8Vljg1xs4X2XsYlt7n1JK2bv4";
const SUPABASE_URL = "https://anvyhjqqdcufibugyuwv.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMessageRealTime(adicionaMessagemRealTime){
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (mensagemRealTime) => {
            adicionaMessagemRealTime(mensagemRealTime.new)
        })
        .subscribe();
}


export default function ChatPage() {
  const router = useRouter();
  const userLogged = router.query.username;
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  
  // Executado uma única vez ao carregar a página
  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', {ascending:false})
      .then(({data}) => {
          setMessageList(data);
      })

      escutaMessageRealTime((mensagemRealTime) =>{
        // Quero re usar um valor de referencia objeto/array
        // passar uma function para o setState
        setMessageList((MessageListAtualizado) =>{
            console.log('valor lista Atualizado', MessageListAtualizado)
            return [
                mensagemRealTime, 
                ...MessageListAtualizado
            ]
        })

      })

  }, []);
  

  function handleNewMessage(newMessage) {
    const mensagem = {
      // id: messageList.lenght + 1,
      from: userLogged,
      text: newMessage,
    };

    supabaseClient
    .from('mensagens')
    .insert([
      mensagem
    ])
    .then(({data})=>{})
    setMessage("");
  }

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
        backgroundColor: "rgba(0,0,0,0.2)"
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
         backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[500],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagem={messageList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
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
            {/* callback */}
            <ButtonSendSticker 
              onStickerClick={(sticker) => {
                handleNewMessage(`:sticker:${sticker}`)
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
        <Text variant="heading2">Chat Geral</Text>
        <Button
          colorVariant="primary"
          label="Logout"
          href="/"
          styleSheet={{
            resize: "none",
            color: appConfig.theme.colors.neutrals["050"],
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
              backgroundColor: appConfig.theme.colors.neutrals[500],
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
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.from}.png`}
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
            {/* IF ternário declarativo */}
            {mensagem.text.startsWith(':sticker:') 
                ? (
                    <Image
                    styleSheet={{
                        width: "200px",
                        height: "200px",
                        display: "inline-block",
                        marginRight: "8px",
                    }}
                    src={mensagem.text.replace(':sticker:', '')} />
                )
                : (
                    mensagem.text
                )}

          </Text>
        );
      })}
    </Box>
  );
}
