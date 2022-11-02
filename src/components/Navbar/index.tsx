/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
import { useState } from 'react'
import { singout } from '../../contexts/AuthContext';

function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen}) {
    async function handleButton() {
        singout()
    }
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-gray-700 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-gray-750 h-20"> {/*logo container*/}
                <Link className="text-xl font-semibold" href="/">Toron</Link>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl font-medium my-4" href="/dashboard" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Dashboard
                </a>
                <a className="text-xl font-normal my-4" href="/cadastros" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Cadastros
                </a>
                <a className="text-xl font-normal my-4" href="/" onClick={() => setTimeout(() => {setOpen(handleButton)}, 100)}>
                    sair
                </a>
            </div>  
        </div>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    async function handleButton() {
        singout()
    }
    return (
        <nav className="flex filter drop-shadow-md bg-gray-700 px-4 py-4 h-18 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link className="text-2xl font-semibold" href="/">Toron</Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-gray-500 rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-gray-500 rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-gray-500 rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink to="/cadastros">
                        Cadastros
                    </NavLink>
                    <button onClick={handleButton}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    )
}