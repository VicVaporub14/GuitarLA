import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);  // data: variable, setData: llave para cambiar var, useState(db): valor inicial
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex( guitar => guitar.id === item.id);
    
    if (itemExists >= 0) {  // Si hay item repetido
        // Actualiza el elemento del carrito para no repetirlo
        if (cart[itemExists].quantity > MAX_ITEMS) return
        const updatedCart = [...cart];    // se crea un nuevo carrito y se asigna a una variable
        updatedCart[itemExists].quantity++;
        setCart(updatedCart)
    } else {
        item.quantity = 1;    // agrega la propiedad quantity al item del carrito
        // Agrega uno nuevo
        setCart([...cart, item])  // Agrega el carrito sin inmutar el state, creando uno nuevo y agregandole el nuevo item
    }
  }


  function removeFromCart(id) {
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }


  function incrementarCantidad(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }


  function decrementarCantidad(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity : item.quantity - 1
          
        }
      }
      return item
    })
    setCart(updatedCart)
  }


  function clearCart() {
    setCart([]);
  }


  return (
    <>
    <Header
      cart = {cart}
      removeFromCart = {removeFromCart}
      incrementarCantidad = {incrementarCantidad}
      decrementarCantidad = {decrementarCantidad}
      clearCart = {clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map( (guitar) => (  // Aqui hay un return implicito, data.map para  iterar sobre los elementos del arreglo
                <Guitar 
                  key={guitar.id}
                  guitar = {guitar}
                  setCart = {setCart}
                  addToCart = {addToCart}
                />
            ))}
            
            
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
