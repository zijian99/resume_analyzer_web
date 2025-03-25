import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from './pages/PageLayout/Layout';
import LayoutMain from './pages/PageLayout/LayoutMain';
import ScrollToTop from './components/ScrollToTop';
import GlobalStyles from './styles/Global.styled';

import RedirectIfMobile from './components/RedirectIfMobile';
import MobileDownload from './pages/MobileDownload';

import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Login from './pages/Login';

import Home from './pages/Home';
import GrammarChecker from './pages/GrammarChecker';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AIChatbot from "./pages/AIChatbot";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

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

          {/* Routes without User Login Required */}
          <Route element={<Layout/>}> 
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Route>
          
          {/* Protected Routes with User Login */}
          <Route element={<LayoutMain/>}> 
            <Route path="/home" element={<Home/>} />
            <Route path="/resumeanalyzer" element={<ResumeAnalyzer/>} />
            <Route path="/grammarchecker" element={<GrammarChecker/>} />
            <Route path="/aichatbot" element={<AIChatbot/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/profile" element={<Profile/>} />
            {/* <Route path="/anademo" element={<ResumeAnalyzeResult />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
