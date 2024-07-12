import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import {db} from  "./data/db";
function App() {
    const [data,setData] = useState(db);
    const [cuenta,setCuenta] = useState(0);
    const [carrito,setCarrito] = useState([]);
    function addCuenta(aumento){
        setCuenta(x=>x+aumento)

    }
    function addCarrito(id){
        
        

        setCarrito(prev=>{
            let repetido = carrito.findIndex(prev=>prev.id==id)
            repetido++
            if (repetido>0) {
                
                return prev.map(y=>{
                    
                    return y.id==id ? {...y,cantidad:y.cantidad+1} : y
                    
                })
            } else {
                
                return [...prev,{id:id,cantidad:1}]
            }
            
            
        })
    }
  return (
    <>
   
    <Header props={data} carrito={carrito}/>
    <main className="container-xl mt-5">
        <h2 className="text-center" onClick={addCarrito}>Nuestra Colección</h2>
        <div className="row mt-5">
            {data.map(x=><Guitar props={x} key={x.id} addCuenta={addCuenta} addCarrito={addCarrito}/>)}
            
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
