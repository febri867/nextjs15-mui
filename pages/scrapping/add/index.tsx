import Layout from "@/components/layout";
import Scrapping from "@/src/modules/scrapping/presentation/interface";

export default function OnHandPage() {
    return (
        <Layout sidebarProps={{ activeRoute: 'Scrapping Instruction' }}>
            <Scrapping role={'superadmin'}/>
        </Layout>
    );
}