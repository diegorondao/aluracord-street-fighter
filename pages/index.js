import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Components Custom
import appConfig from '../config.json';
import {Titulo} from '../src/components';

export default function PaginaInicial() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState();
  const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(true);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/11/street-fighter-v-suzaku-castle-stage.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
      >
        <Box  
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
            {/* Formulário */}
            <Box
                as="form"
                onSubmit= {function (event) {
                event.preventDefault()
                router.push(`/chat?username=${username}`)
                }}      
                styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                }}
            >
                <Titulo tag="h2">Boas vindas!</Titulo>
                <Text 
                variant="body3" 
                styleSheet={{ 
                    marginBottom: '32px', 
                    color: appConfig.theme.colors.neutrals['100'] 
                    }}>
                </Text>

                <TextField
                fullWidth
                textFieldColors={{
                    neutral: {
                    textColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.primary['800'],
                    mainColorHighlight: appConfig.theme.colors.primary['800'],
                    backgroundColor: appConfig.theme.colors.neutrals['800'],                  
                    },
                }}
                onChange={function (event) {
                    setUsername(event.target.value)
                    setPhoto(event.target.value)
                    setDisabledBtnSubmit(Boolean(! event.target.value))
                }}
                placeholder="Username Github"
                />
                <Button
                type='submit'
                label='Entrar'
                fullWidth
                variant="secondary"
                disabled={disabledBtnSubmit}
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary['800'],
                    mainColorLight: appConfig.theme.colors.primary['100'],
                    mainColorStrong: appConfig.theme.colors.primary['600'],
                }}
                />
            </Box>
            {/* Formulário */}

            {/* Photo Area */}
            { username && 
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '200px',
                    padding: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals[999],
                    borderRadius: '10px',
                    flex: 1,
                    minHeight: '240px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                >
                <Image
                    styleSheet={{borderRadius: '50%',marginBottom: '16px'}}
                    src={`https://github.com/${username}.png`}
                />
                <Text
                variant="body4"
                styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
                }}
                >
                    {username}
                </Text>
                </Box>
            } 
            {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
