import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider  style={{
    "--sidebar-width": "13rem",
    "--sidebar-width-mobile": "16rem",
  } as React.CSSProperties}>
      <AppSidebar />
      <main className="flex-1 ">
        <header className="sticky top-0 z-20 flex h-14 mb-4 items-center gap-4 border-b border-white/5 bg-[#050505] backdrop-blur-md px-6">
            <div className="flex items-center gap-2">
              <div className="hover:bg-white/5 p-1 rounded-md transition-colors">
                <SidebarTrigger className="text-cyan-500 hover:text-cyan-300 hover:font-bold scale-110 hover:bg-[#050505] hover:scale-125" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <nav className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System</span>
                <span className="text-[10px] font-mono text-gray-400">/</span>
                <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">Dashboard</span>
              </nav>
            </div>

          
            <div className="ml-auto flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded-full">
                  <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-tighter">Live_Server</span>
               </div>
            </div>
          </header>
      
        <section className="relative z-10 flex-1  animate-in fade-in duration-700"> {children}</section>
       
       
      </main>

    </SidebarProvider>
  )
}