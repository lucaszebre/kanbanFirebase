// _app.tsx
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { GlobalScrollbarStyle } from '@/utils/Scrollbar'
import ContextOpen from '@/contexts/contextopen'
import ContextSidebar from '@/contexts/sidebarcontext'
import { DataProvider } from '@/contexts/datacontext'
import { ThemeProvidered } from '@/contexts/themecontext'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/utils/theme';

function App({ Component, pageProps }: AppProps) {


  return (
    <ThemeProvidered>
    <ThemeProvider theme={ lightTheme}>
      <DataProvider>
        <ContextSidebar>
          <ContextOpen>
            <ChakraProvider>
              <GlobalScrollbarStyle />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </ContextOpen>
        </ContextSidebar>
      </DataProvider>
    </ThemeProvider>
    </ThemeProvidered>
  )
}

export default App
