import { useState } from 'react';

// interface CalendarProps {}


const Calendar = () => {
    
    const fechaActual = new Date( ); // Año, Mes (0-11), Día
    const mesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
    // const mesSiguiente = new Date(fechaActual.getFullYear() , fechaActual.getMonth() + 1, 0);

    const diasDelMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth()+1, 0).getDate();
    
    const numeroDeDiaDelPrimerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1).getDay();

    const ultimoDiaDelMes = new Date(fechaActual.getFullYear(),fechaActual.getMonth() + 1,0).getDay();
    const numeroDeDiasDelMesSiguiente = ultimoDiaDelMes === 6 ? 0 : 6 - ultimoDiaDelMes;

    let contadorDiasMesAnterior = mesAnterior.getDate() - numeroDeDiaDelPrimerDiaDelMes + 1;
    const [diaDelMes, setDiaDelMes] = useState<number>(fechaActual.getDate());
    
    
    return (
        <>
        <section className='h-full w-full mx-auto bg-white rounded-xl shadow-lg p-3'>
        <header className=' mb-4 rounded bg-church-deep-blue '>
            
            <h1 className='ml-4 text-lg font-semibold text-gray-800'>
            {/* {fechaActual.getMonth()+1} / {fechaActual.getFullYear()} */}
            {fechaActual.toLocaleDateString('es-ES', {day: '2-digit' , month: 'long', year: 'numeric' })}
            </h1>
            
        </header>

        <article>
            <div className='grid grid-cols-7 gap-2'>
                {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
                        <div key={d} className="text-center font-medium">{d}</div>
                ))}
            </div>
            <div className='grid grid-cols-7 gap-x-3 gap-y-3 mt-2 justify-items-center'>
                
                {
                    Array.from({length: numeroDeDiaDelPrimerDiaDelMes}, (_,i) => i + 1).map(() => (<div key={contadorDiasMesAnterior} className='text-center opacity-45'>{contadorDiasMesAnterior++}</div>))
                }
                {Array.from({ length:  diasDelMesActual}, (_, i) => i + 1).map((day) => (
                    
                        <div key={day} className={`text-center transition-all duration-200 rounded hover:cursor-pointer hover:bg-blue-100 flex bg-center items-center justify-center w-3/4 lg:w-2/6 ${(day == diaDelMes) ? 'border border-blue-500 rounded-lg':''} `} onClick={() => setDiaDelMes(day)}>
                        <span className={((day == fechaActual.getDate())?'inline-block  bg-blue-800 w-2/3 h-4/5 rounded text-white' : undefined)} >{day.toString() }</span>
                        </div>
                ))}
                {
                    Array.from({length: numeroDeDiasDelMesSiguiente}, (_,i) => i + 1).map((day) => (<div key={day} className='text-center opacity-45'>{day}</div>))
                }
            </div>
        </article>

        </section>
        </>
    );

}

export default Calendar;