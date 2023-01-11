import React,{useState} from 'react'
import {Box,useMediaQuery} from "@mui/material"
import { Outlet } from 'react-router-dom'
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
import { useGetUserQuery } from 'state/api'
import { useSelector } from 'react-redux'
const Layout = () => {
  const isNoneMobile = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIsSidebarOpen] = useState(true)
  
  const userId = useSelector((state) => state.global.userId);
  const {data} =  useGetUserQuery(userId);

  console.log(data)
  return (
    <Box 
    display={isNoneMobile?"flex":"block"}
    width="100%" height="100%">
        <Sidebar
        user={data || {}}
        isNoneMoblie={isNoneMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} />
        <Box
        flexGrow={1}
        >
            <Navbar

            user={data || {}}

            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
        </Box>
    </Box>
  )
}

export default Layout