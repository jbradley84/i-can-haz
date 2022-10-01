import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import SingleCollection from "./pages/SingleCollection";
// import SingleItem from "./pages/SingleItem";
import NoMatch from "./pages/NoMatch";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const httpLink = createHttpLink({
   uri: "/graphql",
});

const client = new ApolloClient({
   link: httpLink,
   cache: new InMemoryCache(),
});


function App() {
   return (
      <ApolloProvider client={client}>
         <Router>
            <div className='App'>
               <Header />
               <div className='page-container'>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/profile">
                        <Route path=":username" element={<Profile />} />
                        <Route path="" element={<Profile />} />
                     </Route>

                     <Route path="*" element={<NoMatch />} />
                  </Routes>
               </div>
               <Footer />
            </div>
         </Router>
      </ApolloProvider>
   );
}

export default App;
