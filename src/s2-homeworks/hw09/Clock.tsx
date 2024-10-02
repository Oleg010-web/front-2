import React, {MouseEventHandler, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)


    const start = () => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);
        setTimerId(intervalId as unknown as number); 
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)

    }

    const stop = () => {
        if(timerId){
            clearInterval(timerId)
            setTimerId(undefined);
        }
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)

    }

    const onMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {  // показать дату если наведена мышка
        event ? setShow(true) : setShow(false)
        
    }
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => { // спрятать дату если мышка не наведена
        event ? setShow(false) : setShow(true)
    }

    const stringTime = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0') || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = date.getDate().toString() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear().toString().padStart(2, '0') || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = new Intl.DateTimeFormat('en-US', {
        weekday: "long",
    }) || <br/> // пишут студенты
    const stringMonth = new Intl.DateTimeFormat('en-US', {
        month: "long",
    }) || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span className={s.day} id={'hw9-day'}>{stringDay.format(date)}</span>,{' '}
                <span className={s.day} id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span className={s.stringMonth} id={'hw9-month'}>{stringMonth.format(date)}</span>,{' '}
                            <span className={s.stringDate} id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId === undefined ? false : true} 
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId !== undefined ? false : true} // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
