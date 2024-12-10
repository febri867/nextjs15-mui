import Layout from "@/src/shared/components/layout";
import {Box} from "@mui/material";
import InquiryFormPage from "@/src/modules/inquiry-form/presentation/interface";
import RequestOnHandPage from "@/src/modules/on-hand/presentation/interface/add.page";

export default function OnHandPage() {
    return (
        <Layout sidebarProps={{ activeRoute: 'On-Hand Adjustment' }}>
            <RequestOnHandPage role={'approver'}/>
        </Layout>
    );
}