import React, { use, useEffect, useState } from 'react'
import CafeFoodGrid from './CafeFoodGrid'
import Header from '../Header'
import Footer from '../../Footer';

function CafeteriaMenu() {

    const [cafeMenu, setCafeMenu] = useState([]);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const displayCafeFood = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cafeteria/menu`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setCafeMenu(data.menu.cafeMenu);
                } else {
                    setMessage(data.errorMessage);
                }

            } catch (error) {
                console.log('ERROR:', error);
            }
        }
        displayCafeFood();
        setInterval(() => {
            displayCafeFood();
        }, 1000);
    }, []);

    return (
        <>
            <div className="min-h-screen flex lg:flex-col lg:gap-x-10 bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-800 p-4 sm:p-6">
                <Header />

                <div className="flex flex-col  gap-y-6 min-h-[40vh] lg:min-h-screen bg-gradient-to-br from-pink-200 via-fuchsia-300 to-purple-400 w-full lg:w-[100%] p-4 sm:p-6 rounded-md shadow-2xl mt-17">

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 justify-items-center'>
                        {
                            cafeMenu.map((food) => (
                                <CafeFoodGrid foodName={food.foodName} price={food.price} key={food._id} id={food._id} soldOut={food.isSoldOut} />
                            ))
                        }
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default CafeteriaMenu