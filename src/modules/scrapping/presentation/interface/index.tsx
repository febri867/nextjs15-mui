'use client'
import {Box} from "@mui/material";
import Header from "@/src/modules/scrapping/presentation/interface/components/dashboard/Header";
import ScrappingList
    from "@/src/modules/scrapping/presentation/interface/components/dashboard/ScrappingList/ScrappingList";

export default function Scrapping({role='superadmin'}): any {
    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <Header />
            <ScrappingList role={role} />
        </Box>
    )
}