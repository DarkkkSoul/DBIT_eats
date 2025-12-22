import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ViewCartCompo from './ViewCartCompo.jsx'
import Footer from '../../Footer.jsx';

function ViewCafeCart() {

    const [completeCart, setCompleteCart] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const viewCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/cafeteria/admin`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setCompleteCart(data.completeCart);

                // if (response.ok) {
                //     console.log(data.message)
                // } else {
                //     console.log(data.errorMessage);
                // }

            } catch (error) {
                console.log('ERROR:', error);
            }
        }
        viewCart();
        const intervalId = setInterval(() => {
            viewCart();
        }, 2000);
        () => { clearInterval(intervalId); }
    }, []);


    const handleBack = () => {
        setTimeout(() => {
            navigate('/admin/cafeteria');
        }, 300);
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-800 p-4 sm:p-6">

                <div className='bg-gradient-to-br from-pink-200 via-fuchsia-300 to-purple-400 min-h-screen w-full rounded-r-4xl pt-5'>

                    <button className='bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2 rounded-xl text-white text-md font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-wide  text-center fixed top-8 left-10 border-1 border-white shadow-xl' onClick={handleBack}>
                        Back
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-5">
                        {completeCart.map((cart) => (
                            <ViewCartCompo
                                key={cart._id}
                                id={cart._id}
                                orderBy={cart.orderBy}
                                cartDetails={cart.cartDetails}
                                orderStatus={cart.orderStatus}
                            />
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default ViewCafeCart