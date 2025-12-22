import React, { useEffect, useState } from 'react'
import useCart from '../../CustomHooks/useCart';

function Total() {

    const [total, setTotal] = useState(0);
    const { cart, clearCart, deleteItem, addCafeItem } = useCart();

    useEffect(() => {
        let sum = 0;
        cart.forEach((item) => {    // Here I can use .reduce()!
            sum += Number(item.price * item.quantity);
        })
        setTotal(sum);
    }, [cart]);

    const [message, setMessage] = useState('');
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('')
            }, 1000);
        }
    })

    const cleanCart = cart.map((item) => ({
        foodName: item.foodName,
        price: item.price,
        quantity: item.quantity
    }));

    // const [isSoldOut, setIsSoldOut] = useState(false);
    // const [soldOutFood, setSoldOutFood] = useState('');
    // useEffect(() => {
    //     cart.forEach((item) => {
    //         if (item.isSoldOut) {
    //             setIsSoldOut(true);
    //             setSoldOutFood(item.foodName);
    //         }
    //     })
    // }, [cart, addCafeItem, deleteItem]);
    const handleCheckout = async () => {
        try {
            // if (isSoldOut) {
            //     console.log(`${soldOutFood} is sold out!`);
            // } else {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/checkout`, {
                method: 'POST',
                body: JSON.stringify({ cartDetails: cleanCart }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    clearCart();
                }, 1500);
            } else {
                setMessage(data.errorMessage);
            }
            // }
        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    if (total === 0) {
        return (
            <div className=' bg-white mx-13 max-w-md text-lg px-6 py-6 rounded-xl'>
                <div className='text-fuchsia-900 text-center font-semibold'>Add an item to cart...</div>
            </div>
        )
    } else {
        return (
            <div className='flex items-center justify-center flex-col gap-y-5'>
                <hr className='text-black w-60 border-1' />

                <div className='flex justify-between bg-white mx-13 text-lg px-6 py-4 rounded-xl w-60'>
                    <div className='text-fuchsia-900'>Total</div>
                    <div className='font-semibold'>
                        {total} Rs
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-y-5'>
                    <button className='bg-white hover:opacity-80 text-fuchsia-900 font-semibold rounded-xl px-6 py-2 ' onClick={handleCheckout}>Checkout</button>
                    {message && <div className='text-white text-center text-sm font-semibold'>{message}</div>}
                </div>
            </div>
        )
    }
}

export default Total