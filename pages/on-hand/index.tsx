import Layout from "@/src/shared/components/layout";
import {Box} from "@mui/material";
import InquiryFormPage from "@/src/modules/inquiry-form/presentation/interface";
import OnHand from "@/src/modules/on-hand/presentation/interface";

export default function OnHandPage() {
    return (
        <Layout sidebarProps={{ activeRoute: 'On-Hand Adjustment' }}>
            <OnHand role={'superadmin'}/>
        </Layout>
    );
}