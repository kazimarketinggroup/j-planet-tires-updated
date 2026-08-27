import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes/router';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </LanguageProvider>
  );
}

export default App;
