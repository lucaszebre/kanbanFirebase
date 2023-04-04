
import Hide from '../components/hide'
import { ChakraProvider } from '@chakra-ui/react'
import DeleteThisBoard from '../components/DeletethisBoard'
import EditBoard from '../components/editBoard/editBoard'
import AddTask from '../components/addTask/addTask'
import AddBoard from '../components/addBoard'
import Theme from '../components/theme'
import Board from '../components/board'
import Sidebar from '@/components/sideBarMobile'
function Home() {

    return (
    <>
        <Sidebar />
        <Hide />
        <ChakraProvider theme={Theme} >
        <Board  />
        </ChakraProvider>
        <DeleteThisBoard />
        <EditBoard />
        <AddBoard  />
        <AddTask />
        </>
    )
}

export default Home
