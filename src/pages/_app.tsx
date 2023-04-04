// _app.tsx
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { GlobalScrollbarStyle } from '@/utils/Scrollbar'
import ContextOpen from '@/contexts/contextopen'
import ContextSidebar from '@/contexts/sidebarcontext'
import { DataProvider } from '@/contexts/datacontext'
import { ThemeProvider } from '@/contexts/themecontext'
import Layout from '@/components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
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
  )
}

export default App
