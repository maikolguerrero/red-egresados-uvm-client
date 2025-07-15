import { useMatch } from 'react-router-dom';
import Header from "./Header";
import Nav from "./Nav";
import { ButtonMessages } from "./Buttons/buttonMessages";
import useIsMobile from "../hooks/useIsMobile";

export default function Layout({ children }) {
    const isMobile = useIsMobile();
    const isChatRoute = useMatch('/chat/:username');

    return (
        <>
            {((!isMobile && isChatRoute) || !isChatRoute) && (
                <>
                    <Header />
                    <div className="h-[10.5vh]"></div>
                </>
            )}

            <main className="flex relative">
                {((!isMobile && isChatRoute) || !isChatRoute) && (
                    <Nav />
                )}
                {isChatRoute && (
                    <div className={`w-full ${isMobile ? 'h-[100vh]' : 'h-[89.5vh]'} flex flex-col`}>
                        {children}
                    </div>
                )}
                {!isChatRoute && (
                    <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
                        {children}
                    </div>
                )}
                {!isChatRoute && (
                    <div className="absolute right-8 bottom-6">
                        <ButtonMessages />
                    </div>
                )}
            </main>
        </>
    );
}