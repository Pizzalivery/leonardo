import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import "./styles/style.css";
import "./styles/variables.css";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      
      <main className="container">
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;
