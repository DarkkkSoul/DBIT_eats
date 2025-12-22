import React, { useEffect, useState } from 'react'
import FoodItem from './FoodItem';
import { useNavigate } from 'react-router-dom'
import Footer from '../../Footer';

function AdminCafe() {

    const navigate = useNavigate();

    // add
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleCafeteriaSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cafeteria/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ foodName, price })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                console.log(data.message);
                setTimeout(() => {
                    setFoodName('');
                    setPrice('');
                }, 1000);

            } else {
                setMessage(data.errorMessage);
                console.log(data.errorMessage);
                setTimeout(() => {
                    setFoodName('');
                    setPrice('');
                }, 1000);
            }


        } catch (error) {
            console.log("ERROR:", error);
        }
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 1500)
        }
    }, [message]);

    // display 

    const [cafeMenu, setCafeMenu] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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
                    setErrorMessage(data.errorMessage);
                }

            } catch (error) {
                console.log('ERROR:', error);
            }
        }
        displayCafeFood();

        setInterval(() => {
            displayCafeFood();
        }, 1000);

    }, [message]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 300);
            }
        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    const handleCart = () => {
        setTimeout(() => {
            navigate('/admin/cafeteria/cart');
        }, 300);
    }

    return (
        <>
            <div className="min-h-screen flex flex-col lg:flex-row gap-y-8 lg:gap-x-10 bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-800 p-4 sm:p-6">

                <div className="flex flex-col gap-y-8 h-full bg-gradient-to-br from-pink-200 via-fuchsia-300 to-purple-400 w-full lg:w-[30%] p-4 sm:p-6 rounded-md shadow-2xl">

                    <div className="w-full bg-white rounded-xl shadow-md p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-purple-800 mb-6 text-center">Cafeteria</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleCafeteriaSubmit}>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Item Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Food Name"
                                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={foodName}
                                    onChange={(e) => setFoodName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-gradient-to-r from-purple-500 to-purple-900 text-white py-2 font-semibold tracking-wider rounded-md hover:bg-purple-800 duration-300 cursor-pointer active:scale-95 transition-all"
                            >
                                Create
                            </button>
                        </form>
                        {message && <p className="text-purple-700 mt-4 text-center text-xs">{message}</p>}
                    </div>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10'>
                        <button onClick={handleLogout} className='bg-gradient-to-r from-red-600 to-orange-400 px-6 py-2.5 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-wide w-full sm:w-auto'>Logout</button>
                        <button className='bg-gradient-to-r from-fuchsia-600 to-pink-600 px-7 py-2.5 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-wide w-full sm:w-auto text-center' onClick={handleCart}>Cart</button>
                    </div>
                </div>

                <div className='w-full bg-gradient-to-br from-pink-200 via-fuchsia-300 to-purple-400 shadow-2xl rounded-md p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-min gap-7'>
                    {
                        cafeMenu.map((item) => (
                            <FoodItem key={item._id} id={item._id} foodName={item.foodName} price={item.price} soldOut={item.isSoldOut} />
                        ))
                    }
                    {errorMessage && <p className="text-purple-700 mt-4 text-center text-xs col-span-full">{errorMessage}</p>}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AdminCafe