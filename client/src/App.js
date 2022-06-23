import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import Home from "./pages/Home"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
// import SingleCause from "./pages/SingleCause"
// import UserProfile from "./pages/UserProfile"

import Header from "./components/Header"
// import Footer from "./components/Footer"

import hero from "./assets/hero.jpg";


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
})

// setup authLink once JWT is setup

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>      
      <Router>
          <Header />          
          <main class="global-container">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
