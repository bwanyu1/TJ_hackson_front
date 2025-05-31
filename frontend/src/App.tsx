import SearchMovie from './components/SearchMovie'
import './App.css'

function App() {

  return (
    <>
      <div className="bg-[#1C1C1C] text-[#1C1C1C] min-h-screen p-6"> {/* 背景色と文字色 */}
        <SearchMovie></SearchMovie>
      </div>
    </>
  )
}

export default App
