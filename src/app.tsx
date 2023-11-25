import { createRef } from 'preact';
import { useState } from 'preact/hooks'

import options from '../options.json';

export function App() {
  const [result, setResult] = useState(-1);
  const [startActivity, setStartActivity] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const spinner = createRef<HTMLUListElement>();

  return (
    <>
      <div class="w-screen h-screen">
        <div class="flex overflow-hidden items-center p-8">
          <div class="mr-auto">
            {!animationStarted ? <>
              <p class="text-5xl">{options[result]?.text ?? <i>Presione <b>Girar</b></i>}</p>
              {options[result]?.special ? <div>
                <p class="text-3xl">Presione <button onClick={() => {
                  setStartActivity(true);
                }}><u>aquí</u></button> para iniciar la actividad.</p>
              </div> : null}
            </> : <p class="text-5xl">Girando...</p>}
          </div>
          <div class="flex flex-col justify-center">
            <div class="block w-0 h-0 mx-auto border-x-[25px] border-x-transparent border-t-[50px] border-t-red-600"></div>
            <ul ref={spinner} class={"overflow-hidden block border-2 border-black w-[500px] h-[500px] rounded-full " + (animationStarted ? "spinAnimation" : "")} style={!animationStarted ? {
              transform: `rotate(${((-((360 / options.length) / 2)) - (result * (360 / options.length)))}deg)`,
            } : {}} onAnimationEnd={() => setAnimationStarted(false)}>
              {options.map((x, i) => <li class={"absolute overflow-hidden top-0 right-0 w-2/4 h-2/4 origin-[0%_100%] " + (i % 2 === 0 ? (!x.special ? "bg-cyan-200" : "bg-yellow-200") : (!x.special ? "bg-cyan-100" : "bg-yellow-100"))} style={{
                transform: "rotate(" + ((360 / options.length) * i) + "deg) skewY(" + -(90 - (360 / options.length)) + "deg)"
              }}>
                <div class="absolute -left-full w-[200%] h-[200%] text-center pt-4" style={{
                  transform: "skewY(" + (90 - (360 / options.length)) + "deg) rotate(" + ((360 / options.length) / 2) + "deg)"
                }}>
                  <span class="inline-block max-w-[25%]">{x.text}</span>
                </div>
              </li>)}

              <li class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div class="block bg-white h-[40px] w-[40px] rounded-full"></div>
              </li>
            </ul>

            <button class="py-4 mt-8 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-100 box-border" disabled={animationStarted} onClick={() => {
              if (!animationStarted) {
                const preResult = Math.floor(Math.random() * (options.length - 1 + 1));
                setResult(preResult);

                if (spinner && spinner.current) {
                  spinner.current.style.setProperty('--finalRotation', `${((-((360 / options.length) / 2)) - (preResult * (360 / options.length)))}deg`);
                }
                setAnimationStarted(true);
              }
            }}>Girar</button>
          </div>
        </div>
        {startActivity ? <>
          <div class="absolute top-0 left-0 h-full w-full bg-black opacity-90" onClick={() => setStartActivity(false)}></div>
          <video class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3" controls>
            <source src={options[result].videoActivity} type="video/mp4" />
          </video>
          {options[result].videoActivity === '/sample.mp4' ? <p class="absolute text-white bottom-8 left-1/2 -translate-x-1/2">"<a class="text-blue-400" href="https://github.com/intel-iot-devkit/sample-videos/blob/master/classroom.mp4">classroom.mp4</a>" by <a class="text-blue-400" href="https://github.com/intel-iot-devkit">Intel® IoT</a> is licensed under <a class="text-blue-400" href="https://github.com/intel-iot-devkit/sample-videos/blob/master/LICENSE">CC BY 4.0</a></p> : null}
        </> : null}
      </div>
    </>
  )
}
