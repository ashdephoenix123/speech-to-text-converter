import { useEffect, useState } from 'react'
import { FaPause, FaMicrophone } from 'react-icons/fa'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { VscDebugRestart } from 'react-icons/vsc'
// import { HiSpeakerWave } from 'react-icons/hi2'
import { HiOutlineClipboardList } from 'react-icons/hi'
import useClipboard from "react-use-clipboard";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [message, setMessage] = useState('');
  const [isCopied, setCopied] = useClipboard(message);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <>
      <div className="container">
        <h1>Speech-to-Text Converter</h1>
        <q className='para'>Transforming speech into text with ease - our speech-to-text recognition web app.</q>
        <div className="main-content">
          {transcript}
        </div>
        <div className="abs">
          <button className="btn letterspace1" onMouseOver={() => { setMessage(transcript) }} onClick={setCopied}><HiOutlineClipboardList size={20} /><span className='messageOnHover'>Copy to Clipboard!</span></button>
          {!toggle ?
            <button className="btn" onClick={() => { { setToggle(prev => !prev); SpeechRecognition.startListening({ continuous: true, language: 'en-IN' }) } }}><FaMicrophone size={20} /><span className='messageOnHover'>Start Listening!</span></button>
            :
            <button className="btn btn2" onClick={() => { setToggle(prev => !prev); SpeechRecognition.stopListening(); }}><FaPause size={20} /><span className='messageOnHover'>Pause</span></button>
          }
          <button onClick={() => { resetTranscript(); }} className='btn letterspace1'><VscDebugRestart size={20} /><span className='messageOnHover'>Reset</span></button>
          {/* <button className='btn letterspace1'><HiSpeakerWave size={20} /></button> */}
        </div>
        {toggle &&
          <div className='belowBtns'>
            Listening...
          </div>}
          <div>
            <p className='para2'>*** Note: Double Tap on Copy to Clipboard on Mobile Devices ***</p>
          </div>
      </div>
    </>
  )
}

export default App
