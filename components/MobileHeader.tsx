import MobileSidebar from "./MobileSidebar"

const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fiexed top-0 w-full z-50">
            <MobileSidebar />
      </nav>
  )
} 

export default MobileHeader