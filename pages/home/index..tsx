import Layout from "@/src/shared/components/layout";
import {Box} from "@mui/material";
import Dashboard from "@/src/modules/home/presentation/interface";

export default function HomePage() {
    return (
        <Layout sidebarProps={{ activeRoute: 'Dashboard' }}>
            <Dashboard/>
        </Layout>
    );
}