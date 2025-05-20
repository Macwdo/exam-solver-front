
type AppProps = {
  children: React.ReactNode,
  developerMode: boolean
}

function App({ children, developerMode }: AppProps) {
  if (developerMode) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-100 ">
        <div className={`bg-white border-1 shadow-xs`} >
          {children}
        </div>
      </div >
    );
  }
  if (!developerMode) {
    return children
  }

}

export default App
