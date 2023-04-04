import React, { createContext, useContext, useState } from 'react';

export type IsBarOpenType = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarMobile:boolean,
    setIsSidebarMobile:React.Dispatch<React.SetStateAction<boolean>>;
};

export const KanbanContext = createContext<IsBarOpenType>({
    isSidebarOpen: true,
    setIsSidebarOpen: () => {},
    isSidebarMobile:true,
    setIsSidebarMobile:()=>{}
});

const ContextSidebar = (props: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isSidebarMobile, setIsSidebarMobile]= useState<boolean>(true)
    return (
        <KanbanContext.Provider
        value={{
            isSidebarOpen,
            setIsSidebarOpen,
            isSidebarMobile, setIsSidebarMobile
            
        }}
        >
        {props.children}
        </KanbanContext.Provider>
    );
    };

export default ContextSidebar;
