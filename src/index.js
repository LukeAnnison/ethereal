import { createRoot } from "react-dom/client";
import { App } from "./popup/popup";
import  Layout  from './components/Layout';
import { PageProvider , ToggleProvider} from "./contexts/pageContext";
import { ProviderProvider } from "./contexts/providerContext";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
  <ProviderProvider>
  <ToggleProvider>
  <PageProvider>
    <Layout>
    <App />
    </Layout>
  </PageProvider>
  </ToggleProvider>
    </ProviderProvider>
);
