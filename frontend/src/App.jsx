import AppProviders from "./1_app/AppProviders";
import AppInitializer from "./1_app/AppInitializer";
import AppRoutes from "./7_routes/AppRoutes";
import ScrollToTop from "./3_components/common/ScrollToTop";

function App() {
  return (
    <AppProviders>
      <AppInitializer>
        <ScrollToTop />
        <AppRoutes />
      </AppInitializer>
    </AppProviders>
  );
}

export default App;