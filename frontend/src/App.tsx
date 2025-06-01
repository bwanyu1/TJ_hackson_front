import SearchMovie from './components/SearchMovie'
import './App.css'
import  { useState } from 'react';
import { useEffect } from 'react';
import Curtain from './components/Curtain';


function App() {
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(false);
    }, 1600); // アニメーション終了後に非表示に
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <div className="bg-[#1C1C1C] text-[#1C1C1C] min-h-screen p-6 overflow-x-hidden"> {/* 背景色と文字色 */}
        {showCurtain && <Curtain />}
        <SearchMovie></SearchMovie>
      </div>
    </>
  )
}

export default App
