import React, { useEffect, useState } from 'react'
import Header from '../Header'
import CanFoodGrid from './CanFoodGrid';


function CanteenMenu() {

    const [canteenMenu, setCanteenMenu] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const displayCanteenFood = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/canteen/menu`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setCanteenMenu(data.menu.canteenMenu);
                } else {
                    setErrorMessage(data.errorMessage);
                }

            } catch (error) {
                console.log('ERROR:', error);
            }
        }
        displayCanteenFood();
    }, []);
    return (
        <div className='flex items-center justify-center w-full bg-white p-5'>
            <div className='bg-fuchsia-800 w-107 min-h-170 flex flex-col relative pb-6'>
                <Header />
                <div className='grid grid-cols-2 gap-y-3 justify-items-center'>
                    {
                        canteenMenu.map((item) => (
                            <CanFoodGrid foodName={item.foodName} price={item.price} key={item._id} id={item._id} />
                        ))
                    }

                </div>
            </div>

        </div >
    )
}

export default CanteenMenu