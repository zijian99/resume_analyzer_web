import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './pages/PageLayout/Layout';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import GlobalStyles from './styles/Global.styled';
import About from './pages/About';
import Home from './pages/Home';
import ScrollToTop from './components/ScrolltoTop';
import GrammarChecker from './pages/GrammarChecker';
import LayoutMain from './pages/PageLayout/LayoutMain';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import { useNavigate } from 'react-router-dom';
import MobileDownload from './pages/MobileDownload';
import RedirectIfMobile from './components/RedirectIfMobile';
import ResumeAnalyzeResult from './components/ResumeAnalyzerComponent/ResumeAnalyzeResult';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        {/* Some Setup */}
        <GlobalStyles/>
        <ScrollToTop/>
        <RedirectIfMobile/>
        {/* Route Setup */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/mobile" element={<MobileDownload />} />
          <Route element={<LayoutMain/>}> 
            <Route path="/home" element={<Home/>} />
            <Route path="/resumeanalyzer" element={<ResumeAnalyzer/>} />
            <Route path="/grammarchecker" element={<GrammarChecker/>} />
            <Route path="/anademo" element={<ResumeAnalyzeResult />} />
          </Route> 
            {/* element is to make that everything inside the<Route> has the <Layout> component */}
            <Route element={<Layout/>}> 
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
