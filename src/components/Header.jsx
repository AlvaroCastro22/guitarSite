import { Fragment,useMemo } from "react"
function Header({props,carrito,removeFromCarrito,addCantidad,decreaseCantidad,clearCarrito}){
    
    
        const initialValue = 0;
      
        const totalPagar =useMemo(()=>carrito.reduce((accumulator,currentValue) => accumulator + currentValue.price*currentValue.cantidad,initialValue,),[carrito]) 
    
    //State derivado
    const isEmpty = useMemo(() => carrito.length === 0,[carrito]) ;
    return (
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty
                            ?
                             <p className="text-center">El carrito esta vacio</p>
                            :
                            <>
                            <table className="w-100 table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th> 
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                carrito.map(item=>{
   
                                    const elemento = props.find((x)=> x.id == item.id)
                                    return (<tr key={item.id}>
                                        
                                        <td>
                                        <img className="img-fluid" src={`./img/${elemento.image}.jpg`} alt="imagen guitarra" />
                                    </td>
                                    <td>{elemento.name}</td>
                                    <td className="fw-bold">
                                            {elemento.price}
                                    </td>
                                    <td className="flex align-items-start gap-4">
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={()=>{decreaseCantidad(item.id)}}
                                        >
                                            -
                                        </button>
                                            {item.cantidad}
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={()=>{addCantidad(item.id)}}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={()=>removeFromCarrito(item.id)}
                                        >
                                            X
                                        </button>
                                    </td>
                                        </tr>)
                                })
                            }
                            </tbody>
                        </table>
                        <p className="text-end">Total pagar: <span className="fw-bold">${totalPagar}</span></p>
                        </>
                            }
                            
                               
                            
                            <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCarrito}>Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}

export default Header