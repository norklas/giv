import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home"
import SingleCause from "./pages/SingleCause"
import UserDashboard from "./pages/UserDashboard"

import Header from "./components/Header"
import Footer from "./components/Footer"

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
              <Route path="/cause" element={<SingleCause />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </main>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
