import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import {db} from  "./data/db";
function App() {
    const MAX_ITEMS = 6;
    const initialCarrito = () =>{
        const localStorageCarrito = localStorage.getItem('cart')
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
    }

    const [data] = useState(db);
    const [cuenta,setCuenta] = useState(0);
    const [carrito,setCarrito] = useState(initialCarrito);
    function addCuenta(aumento){
        setCuenta(x=>x+aumento)

    }
    function addCarrito(item){
        let repetido = carrito.findIndex(prev=>prev.id==item.id)
        if (repetido>=0) {
            if(carrito[repetido].cantidad>=MAX_ITEMS) return 
            let nuevoCarrito = [...carrito]
            nuevoCarrito[repetido].cantidad++
            setCarrito(nuevoCarrito)
        } else {
            item.cantidad = 1
            setCarrito(prev=>[...prev,item])
        }
        // saveLocalStorage()
        // setCarrito(prev=>{
        //     let repetido = carrito.findIndex(prev=>prev.id==id)
        //     if (repetido>=0) {
                
        //         return prev.map(y=>{
                    
        //             return y.id==id ? {...y,cantidad:y.cantidad+1} : y
                    
        //         })
        //     } else {
                
        //         return [...prev,{id:id,cantidad:1}]
        //     }
            
            
        // })
    }
    function removeFromCarrito(id){
        console.log(id);
        setCarrito(x=>x.filter(y=>y.id!=id))
    }
    function addCantidad(id){
        setCarrito(prev=>prev.map(x=>
            {
                return x.id==id && x.cantidad<MAX_ITEMS  ? {...x,cantidad:x.cantidad++} : x 
            }))
    }
    function decreaseCantidad(id){
        setCarrito(prev=>prev.map(x=>
            {
                return (x.id==id && x.cantidad>1) ? {...x,cantidad:x.cantidad-1} : x 
            }))
    }
    function clearCarrito(){
        // let nuevoCarrito = [...carrito]
        // nuevoCarrito.splice(0,nuevoCarrito.length)
        // setCarrito(nuevoCarrito)
        setCarrito([])
    }
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(carrito))
    },[carrito])
    
  return (
    <>
   
    <Header props={data} carrito={carrito} removeFromCarrito={removeFromCarrito} addCantidad={addCantidad} decreaseCantidad={decreaseCantidad} clearCarrito={clearCarrito}/>
    <main className="container-xl mt-5">
        <h2 className="text-center" >Nuestra Colección</h2>
        <div className="row mt-5">
            {data.map(x=><Guitar props={x} key={x.id} addCarrito={addCarrito}/>)}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
</>
  )
}

export default App
