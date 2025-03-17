import "./App.css"
import { useCallback, useState, useEffect, useRef } from 'react'
function passGenerator() {
  const [length, setLength] = useState(5)   // useState is required because it helps to visualize changes in the UI without it no changes will appear in react this is a default process
  const [numberAllowed, setAllowed] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")


  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{    // useCallback defines the concept of memoization here 
    let pass = ""                                 // it stores the changes in memory as a cache 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(characters) str+= "!@#$%^&*+=-?{}[]"

    for(let i=1;i<length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
      
    setPassword(pass)
  
  }, [length, numberAllowed, characters, setPassword])

    const copyPassword = useCallback(()=>{
      const button = document.getElementById("button")
      button.style.background = "black"
      button.innerHTML = "Copied!"
      passwordRef.current?.select()     // use of useRef hook
      //passwordRef.current?.setSelectionRange(0,3)     // setSelectionRange is a default method in react

      setTimeout(()=>{
        button.style.background = ""
        button.innerHTML = "Copy"

      }, 1000)
      window.navigator.clipboard.writeText(password)  	  // this is the default syntax of copying text 
    }, [password])

  useEffect(()=>{         // useEffect method is called here which helps to rerun the entire build whenever it detects any changes in any of the state mentioned 
    passwordGenerator()
  }, [length, numberAllowed, characters, passwordGenerator])



  return (
    <>
      <div className=" font-sfPro w-full h-100 max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-400" >
        <h1 className='text-white text-center my-0 font-bold underline decoration-black text-2xl
        decoration-2 underline-offset-6 uppercase'>CipherMate: Crafting Impeccable Passwords</h1>
        <p className="text-slate-500 text-base my-3 text-center font-sfPro font-bold text-pretty ">CipherMate allows users to set password length up to 100 characters with an intuitive range slider. 
          Easily include numbers, characters</p>
          <p className="text-zinc-400 font-bold text-sm my-7 text-center text-wrap">Copy passwords to the clipboard with a single click for 
          convenience and security.</p>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className=" w-full p-2 px-3 mx-2 bg-white rounded-full outline-none" 
          placeholder="password"
          readOnly
          ref={passwordRef}
          />

          <button id="button" onClick={copyPassword} className=" w-25 text-xz
          bg-blue-700 text-white text-center hover:bg-blue-600 rounded-full ">Copy</button>
        </div>
          <div className="flex text-sm gap-x-4">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={5}
            max={100}
            value={length}
            className="cursor-pointer my-7"
            onChange={(e)=>{setLength(e.target.value)}}   // this is the syntax for onChange to  change the value of the range slider
            />                                            
            <label className="mx-1  mb-1 ">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1" >
              <input type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setAllowed((prev) => !prev)   // an optimised approach of setAllowed(true) to propogate events
                // like this we can fire a callback function which helps to access the previous value 
                // here !(not) will switch value if false then true if true then false
              }}
            />
            <label className="mb-1">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1" >
              <input type="checkbox" 
              defaultChecked={characters}
              id="characterInput"
              onChange={()=>{
                setCharacters((prev) => !prev)   
              }}
            />
            <label className="mb-1">Characters</label>
            </div>
            
            </div>
      </div>
    </>
  )
}

export default passGenerator
