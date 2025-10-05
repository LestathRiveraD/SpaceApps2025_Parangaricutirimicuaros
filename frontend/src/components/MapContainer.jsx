import Carrousel from "./Carrousel"
import Description from "./Description"

/*
    Este componente controla toda la sección derecha de la página.
    Mira el figma. No creo que ocupe nada más aparte de como ya está aquí.
*/

export default function MapContainer(props) {

    console.log("Radio en MapContainer: ", props.radius)

    return <div className='MapContainer'>
    <Carrousel radius={props.radius}>
    </Carrousel> 
    <Description />
    </div>
}