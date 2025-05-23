
type AppProps = {
  children: React.ReactNode,
  developerMode: boolean
}

function App({ children, developerMode }: AppProps) {
  if (developerMode) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-200">
        <div className={`bg-white  border-zinc-200 shadow-2xs`} >
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
