import {Box, Grid2 as Grid, Typography} from "@mui/material";
import Image from "next/image";
import Toyota from "@/images/toyota.png"
import Profile from "@/images/profile.png"
import NewTask from "@/images/new-task.png"
import Notification from "@/images/notification.png"
import DocProgress from "@/images/doc-progress.png"
import MyForm from "@/images/my-form.png"
import Complete from "@/images/approved.png"

export default function Dashboard() {
    return (
        <>
            <Box display={'flex'} alignItems={'center'} padding={5} sx={{backgroundImage: 'linear-gradient(to bottom right, #2D6764, #e0eee8)'}}>
                <Image width={200} src={Toyota} alt={'toyota'}/>
                <Typography color={'#626163'} textAlign={'center'} padding={'0 20%'} fontWeight={1000} fontSize={'36px'}>WAREHOUSE WORKFLOW APPROVAL SYSTEM</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Box sx={{
                        backgroundColor: 'white',
                        padding: '16px',
                        height: '100px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        margin: '24px 0'
                    }} display={"flex"} alignItems={'center'} justifyContent={'space-between'}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={Profile} alt={'profile'}/>
                        <Typography color={'#2D6764'} fontSize={'20px'} fontWeight={400}>My Profile</Typography>
                    </Box>
                </Grid>
                <Grid size={3}>
                    <Box sx={{
                        height: '100px',
                        backgroundColor: 'white',
                        padding: '16px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        margin: '24px 0'
                    }} display={"flex"} alignItems={'center'} justifyContent={'space-between'}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={NewTask} alt={'profile'}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }}>
                            <Typography color={'#2D6764'} fontSize={'36px'} fontWeight={400}>0</Typography>
                            <Typography color={'#2D6764'} fontSize={'20px'} fontWeight={400}>New Task</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={3}>
                    <Box sx={{
                        height: '100px',
                        backgroundColor: 'white',
                        padding: '16px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        margin: '24px 0'
                    }} display={"flex"} alignItems={'center'} justifyContent={'space-between'}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={Notification} alt={'profile'}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }}>
                            <Typography color={'#2D6764'} fontSize={'36px'} fontWeight={400}>0</Typography>
                            <Typography color={'#2D6764'} fontSize={'20px'} fontWeight={400}>New Notices</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={3}>
                    <Box sx={{
                        height: '100px',
                        backgroundColor: 'white',
                        padding: '16px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        margin: '24px 0'
                    }} display={"flex"} alignItems={'center'} justifyContent={'space-between'}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={DocProgress} alt={'profile'}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }}>
                            <Typography color={'#2D6764'} fontSize={'36px'} fontWeight={400}>0</Typography>
                            <Typography textAlign={'right'} color={'#2D6764'} fontSize={'20px'} fontWeight={400}>Partial Complete</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box
                backgroundColor={'white'}
                sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',}}
            >
                <Grid container spacing={2}>
                    <Grid size={3}
                          display={"flex"} alignItems={'center'} justifyContent={'space-between'}
                          sx={{
                              padding: '24px',
                              margin: '24px 0',
                              borderRight: '2px solid #eee'
                          }}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={MyForm} alt={'profile'}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }}>
                            <Typography color={'#2D6764'} fontSize={'36px'} fontWeight={400}>0</Typography>
                            <Typography textAlign={'right'} color={'#2D6764'} fontSize={'20px'} fontWeight={400}>My Form</Typography>
                        </Box>
                    </Grid>
                    <Grid size={3}
                          display={"flex"} alignItems={'center'} justifyContent={'space-between'}
                          sx={{
                              padding: '24px',
                              margin: '24px 0',
                              borderRight: '2px solid #eee'
                          }}>
                        <Image style={{filter: 'invert(48%) sepia(10%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }} width={'40'} src={Complete} alt={'profile'}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }}>
                            <Typography color={'#2D6764'} fontSize={'36px'} fontWeight={400}>0</Typography>
                            <Typography textAlign={'right'} color={'#2D6764'} fontSize={'20px'} fontWeight={400}>Complete Form</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}