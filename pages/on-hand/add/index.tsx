'use client'
import Layout from "@/src/shared/components/layout";
import {Box} from "@mui/material";
import InquiryFormPage from "@/src/modules/inquiry-form/presentation/interface";
import OnHand from "@/src/modules/on-hand/presentation/interface";
import RequestOnHandPage from "@/src/modules/on-hand/presentation/interface/add.page";

export default function OnHandPage() {
    let role = 'submitter'
    if(typeof window === "undefined"){
        // role = localStorage.getItem('role')
    }
    return (
        <Layout sidebarProps={{ activeRoute: 'On-Hand Adjustment' }}>
            <RequestOnHandPage role={role}/>
        </Layout>
    );
}