import { RouterProvider } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { router } from './routes';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
