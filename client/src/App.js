import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// IMPORT COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import SingleCollection from "./pages/SingleCollection";
// import SingleItem from "./pages/SingleItem";
import NoMatch from "./pages/NoMatch";

// IMPORT ROBOTO FONT VARIATIONS
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// CUSTOM MATERIAL UI THEME
/*  HOW TO USE: 
    primary = red/pink
    secondary = blue/purple
   • All colors default to "main" so for main shade use the color prop ➝ color="primary"
   • To use the light & dark shades you must use the sx prop ➝ sx={{ color: 'primary.light' }}
   • If you need to specify black or white for something then it will only work in the sx prop
   • For some components using a main color (ie. primary or secondary alone) with the color prop 
     won't work so in that case use an sx prop and specfify main ➝ sx={{ color: 'primary.main' }}
*/ 
let theme = createTheme ({
  palette: {
    type: 'light',
    primary: {
      main: '#D62246',
      contrastText: '#ffffff',
      light: '#de4e6b',
      dark: '#951731',
      lighter: '#F5ABBA'
    },
    secondary: {
      main: '#4e54c8',
      contrastText: '#ffffff',
      light: '#7176d3',
      dark: '#363a8c',
    },
    background: {
      default: '#ffffff',
    },
    error: {
      main: '#e30f00',
      light: '#e83f33',
      dark: '#9e0a00',
    },
    divider: 'rgba(0,0,0,0.12)',
    text: {
      primary: '#000000',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0,0,0,0.38)',
      hint: 'rgba(255,255,255,0.5)',
    },
  },
});

theme = responsiveFontSizes(theme);

const httpLink = createHttpLink({
   uri: "/graphql",
});

const client = new ApolloClient({
   link: httpLink,
   cache: new InMemoryCache(),
});


function App() {
   return (
      <ThemeProvider theme={theme}>
         <ApolloProvider client={client}>
            <Router>
               <div className='App'>
                  <Header />
                  <div className='page-container'>
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        {/* <Route path="/profile">
                           <Route path=":username" element={<Profile />} />
                           <Route path="" element={<Profile />} />
                        </Route> */}

                        <Route path="*" element={<NoMatch />} />
                     </Routes>
                     
                  </div>
                  <Footer />
               </div>
            </Router>
         </ApolloProvider>
      </ThemeProvider>
   );
}

export default App;
