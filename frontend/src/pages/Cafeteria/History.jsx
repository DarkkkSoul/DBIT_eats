import React, { useEffect, useState, useTransition } from 'react'
import CartHistoryComponent from './CartHistoryComponent';
import { Link } from 'react-router';
import Footer from '../../Footer';

function History() {

    const [cartHistory, setCartHistory] = useState([]);

    useEffect(() => {
        const viewHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/cafeteria/history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setCartHistory(data.history);

                if (response.ok) {
                    // console.log(data.message);
                } else {
                    console.log(data.errorMessage);
                }

            } catch (error) {
                console.log('ERROR:', error);
            }
        }

        viewHistory();

        const intervalId = setInterval(() => {
            viewHistory();
        }, 30000);

        () => { clearInterval(intervalId); };
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col lg:flex-row gap-y-8 lg:gap-x-10 bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-800 p-4 sm:p-6">

                <div className="flex flex-col  gap-y-6 min-h-screen lg:min-h-screen bg-gradient-to-br from-pink-200 via-fuchsia-300 to-purple-400 w-full lg:w-[100%] p-4 sm:p-6 rounded-md shadow-2xl">

                    <div className="flex justify-between items-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-purple-900">Cart History</h2>
                        <Link to="/cafeteria" className="text-md sm:text-base text-white bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-lg shadow">
                            Back
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 overflow-y-auto">
                        {cartHistory.map((cart) => (
                            <CartHistoryComponent
                                key={cart._id}
                                orderStatus={cart.orderStatus}
                                cartDetails={cart.cartDetails}
                                createdAt={cart.createdAt}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default History
