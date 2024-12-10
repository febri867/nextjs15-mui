import {Box, Button, CardActions, Typography} from "@mui/material";
import Image from "next/image";
import Toyota from "@/images/ic-toyota.png"
import ToyotaWhite from "@/images/ic-tam-white.png"
import {router} from "next/client";

const ssoLogin = () => {
    const width = 640;
    const height = 480;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;
    const params = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
    window.open(ssoUrl, 'tamsso', params);
    window.addEventListener('message', async function (event) {
        const message = event.data;
        if (message.Content) {
            const token = parseJwt(message.Content)
            const email = token.email
            const userName = token.unique_name
            const userRole = token.roles
            const getUserId = await requestGetUserId({
                "Email": email,
                "Name": userName,
                "Role": userRole[0],
            })
            await setTokenLogin(getUserId.tokenLogin)
            navigate('/chat')
            navigate(0)
        }
    });
};

export default function Login() {
    const handleLogin = () => {
        ssoLogin()
    }
    const handleLoginDev = (role)=> {
        localStorage.setItem('role',role)
        router.push("/home")
    }
    return (
        <Box
            sx={{width:'100%', height:'calc( 100vh - 16px )', overflow: 'hidden', backgroundSize:'cover', backgroundImage: `url(/images/bc-login.png)`,}}
        >
           <Box sx={{marginLeft: '200px'}}>
               <Box alignItems={'center'} flexDirection={'column'} padding={6} display={'flex'} sx={{width: '40vw'}}>
                   <Image width={200} src={Toyota} alt={"toyota"}/>
                   <Typography color={'#626163'} textAlign={'center'} fontWeight={1000} fontSize={'32px'}>WAREHOUSE WORKFLOW APPROVAL SYSTEM</Typography>
               </Box>
               <Box padding={6} sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   width: '40vw'
               }}>
                   <Button
                       sx={{
                           textTransform: 'none',
                           width: '300px',
                           height: '2.5em',
                           borderRadius: '1.4em',
                           mr: 1,
                           textAlign: 'left',
                           justifyContent: 'flex-start',
                           paddingLeft: '1em',
                           marginBottom: '0.5em',
                           backgroundColor: '#c93f3b',
                           '&:focus': {
                               outline: 'none',
                           },
                           '&:hover': {
                               backgroundColor: '#8d0209',
                           }
                       }}
                       type="submit"
                       variant="contained"
                       size="small"
                       startIcon={<Image width={20} height={20} style={{ padding: '.6em' }} alt={'toyota'} src={ToyotaWhite} />}
                       // disabled={!isDirty || !isValid || isSubmitting}
                       onClick={handleLogin}
                   >
                       <Typography sx={{ mr: 2, fontSize: 14 }}>Login Using TAM Passport</Typography>
                   </Button>
                   <Button
                       sx={{
                           width: '300px',
                           textTransform: 'none',
                           height: '2.5em',
                           borderRadius: '1.4em',
                           mr: 1,
                           textAlign: 'left',
                           justifyContent: 'flex-start',
                           backgroundColor: '#c93f3b',
                           marginBottom: '0.5em',
                           '&:focus': {
                               outline: 'none',
                           },
                           '&:hover': {
                               backgroundColor: '#8d0209',
                           },
                           pl: 1.55
                       }}
                       type="submit"
                       variant="contained"
                       size="small"
                       color={"error"}
                       startIcon={<Image width={20} height={20} style={{ padding: '.6em' }} alt={'toyota'} src={ToyotaWhite} />}
                       // disabled={!isDirty || !isValid || isSubmitting}
                       onClick={()=>handleLoginDev('submitter')}
                   >
                       <Typography sx={{ fontSize: 14 }}>Login Submitter</Typography>
                   </Button>
                   <Button
                       sx={{
                           width: '300px',
                           textTransform: 'none',
                           height: '2.5em',
                           borderRadius: '1.4em',
                           mr: 1,
                           textAlign: 'left',
                           justifyContent: 'flex-start',
                           backgroundColor: '#c93f3b',
                           marginBottom: '0.5em',
                           '&:focus': {
                               outline: 'none',
                           },
                           '&:hover': {
                               backgroundColor: '#8d0209',
                           },
                           pl: 1.55
                       }}
                       type="submit"
                       variant="contained"
                       size="small"
                       color={"error"}
                       startIcon={<Image width={20} height={20} style={{ padding: '.6em' }} alt={'toyota'} src={ToyotaWhite} />}
                       // disabled={!isDirty || !isValid || isSubmitting}
                       onClick={()=>handleLoginDev('approver')}
                   >
                       <Typography sx={{ fontSize: 14 }}>Login Approver</Typography>
                   </Button>
                   <Button
                       sx={{
                           width: '300px',
                           textTransform: 'none',
                           height: '2.5em',
                           borderRadius: '1.4em',
                           mr: 1,
                           textAlign: 'left',
                           justifyContent: 'flex-start',
                           backgroundColor: '#c93f3b',
                           '&:focus': {
                               outline: 'none',
                           },
                           '&:hover': {
                               backgroundColor: '#8d0209',
                           },
                           pl: 1.55
                       }}
                       type="submit"
                       variant="contained"
                       size="small"
                       color={"error"}
                       startIcon={<Image width={20} height={20} style={{ padding: '.6em' }} alt={'toyota'} src={ToyotaWhite} />}
                       // disabled={!isDirty || !isValid || isSubmitting}
                       onClick={()=>handleLoginDev('superadmin')}
                   >
                       <Typography sx={{ fontSize: 14 }}>Login Superadmin</Typography>
                   </Button>
               </Box>
           </Box>

    </Box>)
}