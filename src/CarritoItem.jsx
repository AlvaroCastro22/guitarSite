export default function CarritoItem({props,data}){
    const {id,cantidad} = props;
    const elemento = data.find((x)=> x.id == id)
    return (<div>
        <p>{elemento.name}</p>
        <p>id:{id}</p>
        <span>cantidad:{cantidad}</span>
        <p>------------</p>
    </div>)
}