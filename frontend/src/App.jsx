import Sidebar from './components/Sidebar' 
import MapContainer from './components/MapContainer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from 'react';

/*
  Este componente se encarga de controlar toda la sección izquierda de 
  la página principal, osea, el sidebar.

  Por ahora, hay que ver si todo esto se puede refactorizar en
  más componentes.
*/

export default function App() {

  const [radius, setRadius] = useState(1000);

  return (
      <div className='container'>
        <Sidebar radius={radius} setRadius={setRadius} />
        <MapContainer radius={radius} />
      </div>
  )
}