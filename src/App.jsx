import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryclient = new QueryClient()
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryclient}>

      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
