import Layout from "@/src/shared/components/layout";
import {Box} from "@mui/material";
import InquiryFormPage from "@/src/modules/inquiry-form/presentation/interface";

export default function HomePage() {
    return (
        <Layout sidebarProps={{ activeRoute: 'On Hand Adjustment Management' }}>
            <InquiryFormPage/>
        </Layout>
    );
}