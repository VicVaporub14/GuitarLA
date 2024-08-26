// import Guitar from "./Guitar";
import { useMemo } from "react";

export default function Header(props) {

    // const numeros = [1,2,3,4,5];
    // const total = numeros.reduce( (total, numero) => total + numero,0);   .reduce, para iterar sobre los elementos
    //                                                                       y sumarlos en un total

    // State Derivado
    const isEmpty = useMemo( () => props.cart.length === 0, [props.cart]); // useMemo() renderiza la parte que se desea en el momento

    const cartTotal = useMemo( () => props.cart.reduce( ( total, item ) => total + (item.quantity * item.price), 0), [props.cart] );

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
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
                                            {props.cart.map( guitar => (
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`/img/${guitar.image}.jpg`} 
                                                            alt="imagen guitarra" />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">
                                                            ${guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={ () => props.decrementarCantidad(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                            {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={ () => props.incrementarCantidad(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={ () => props.removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                </>
                                )}

                                <button 
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={props.clearCart}
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

