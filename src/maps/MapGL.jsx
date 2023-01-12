import React from 'react';
import { load } from '@2gis/mapgl';
import { useEffect } from 'react';

let style = {
    width: '80vw',
    height: '80vh',
}
let ContainerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const API_KEY = '042b5b75-f847-4f2a-b695-b5f58adc9dfd'

const MapContainer = ({ data }) => {

    // ++++++++++++++++++++++++++++++++++

    // получаем в переменную массив с метками и названиями полигонов
    let marks = data.map(item => {
        let Loc = JSON.parse(item.Location)
        let mark = []
        mark.push(Loc.Center, item.Name)
        return mark
    })

    //  получаем координаты границ полигонов
    let polygon = data.map(item => {
        let Loc = JSON.parse(item.Location)
        return Loc.Polygon
    })

    // ++++++++++++++++++++++++++++++++++

    useEffect(() => {
        // ++++++++++++++++++++++++++++++++++

        //Получаем карту
        load().then((mapglAPI) => {
            const map = new mapglAPI.Map('container', {
                center: [45.5664671117079, 42.5615372315855],
                zoom: 12,
                key: API_KEY,
            });

            // ++++++++++++++++++++++++++++++++++   

            // добавляем метки на карту
            marks.forEach(item => {
                const label = new mapglAPI.Label(map, {
                    coordinates: item[0],
                    image: {
                        url: 'https://docs.2gis.com/img/mapgl/tooltip-top.svg',
                        size: [100, 50],
                        padding: [10, 5, 5, 5],
                    },
                    text: item[1],
                    color: '#010e27',
                });
            })
            // ++++++++++++++++++++++++++++++++++

            // отрисовываем полигоны
            polygon.forEach(space => {
                const polygon = new mapglAPI.Polygon(map, {
                    coordinates: [space],
                    color: '#838ed754',
                    strokeWidth: 3,
                    strokeColor: '#fff',
                });
            })



        });
    }, [data])

    // ++++++++++++++++++++++++++++++++++


    // оборачиваем блок, чтобы избежать множественного рендеринга

    const MapWrapper = React.memo(
        () => {
            return <div id="container" style={style}></div>
        },
        () => true,
    );

    // ++++++++++++++++++++++++++++++++++    
    return (
        <div style={ContainerStyle}>
            <MapWrapper />
        </div>
    )
}

export default MapContainer