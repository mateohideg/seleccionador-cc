import { useEffect, useState } from 'preact/hooks'

export function App() {

  const options = [
    { text: "Opción normal #1", special: false },
    { text: "Opción normal #2", special: false },
    { text: "Opción normal #3", special: false },
    { text: "Opción normal #4", special: false },
    { text: "Opción especial #1", special: true },
    { text: "Opción especial #2", special: true },
    { text: "Opción especial #3", special: true },
    { text: "Opción especial #4", special: true },
  ]

  const [result, setResult] = useState(-1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if(result > -1) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
  }, [result]);

  return (
    <>
      <div class="flex overflow-hidden items-center h-screen p-8">
        <div class="mr-auto">
          {!animate ? <>
          <p class="text-5xl">{options[result]?.text ?? <i>Presione <b>Girar</b></i>}</p>
          {options[result]?.special ? <div>
            <p class="text-3xl">Presione <button onClick={() => {
              alert('WIP');
            }}><u>aquí</u></button> para iniciar la actividad.</p>
          </div> : null}
          </> : <p class="text-5xl">Girando...</p>}
        </div>
        <div class="flex flex-col justify-center">
          <ul class={"relative overflow-hidden block border-2 border-black w-[500px] h-[500px] rounded-full " + (animate ? 'animate-spin' : '')}>
            {options.map((x, i) => <li class={"absolute overflow-hidden top-0 right-0 w-2/4 h-2/4 origin-[0%_100%] " + (i % 2 === 0 ? "bg-slate-200" : "bg-slate-100")} style={{
                transform: "rotate(" + ((360 / options.length) * i) + "deg) skewY(" + -(90 - (360 / options.length)) + "deg)"
              }}>
              <div class="absolute -left-full w-[200%] h-[200%] text-center pt-4" style={{
                transform: "skewY(" + (90 - (360 / options.length)) + "deg) rotate(" + ((360 / options.length) / 2) + "deg)"
              }}>{x.text}</div>
              </li>)}
          </ul>
          <button class="py-4 mt-8 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-100 box-border" onClick={() => {
            setResult(Math.floor(Math.random() * (options.length - 1 + 1)));
          }}>Girar</button>
        </div>
      </div>
    </>
  )
}
