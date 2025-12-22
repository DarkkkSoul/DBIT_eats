import React, { useEffect } from 'react'

function ViewCartCompo(props) {

    const handleStatus = async (id) => {

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/cafeteria/update-status/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
    }

    return (
        <div className="bg-gradient-to-tl from-fuchsia-300 to-fuchsia-600 shadow-lg rounded-xl px-4 border border-gray-300 w-full max-w-xs flex flex-col justify-between pb-10 pt-6" id={props.id}>

            <div className="text-center text-xl font-bold text-black mb-4">
                Ordered by: {props.orderBy}
            </div>

            <div className="flex-1 overflow-auto space-y-3 px-3">
                {
                    props.cartDetails.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/80 rounded-lg border border-white px-3 py-2 flex justify-between items-center shadow-sm"
                        >
                            <span className="text-gray-800 font-medium tracking-wide">{item.foodName}</span>
                            <span className="text-blue-600 font-semibold text-lg">× {item.quantity}</span>
                        </div>
                    ))
                }
            </div>

            <button onClick={() => handleStatus(props.id)}
                className="mt-4 bg-gradient-to-r from-purple-500 to-purple-900 text-white py-2 font-semibold tracking-wider rounded-md duration-300 cursor-pointer hover:scale-105 active:scale-95 transition-all mx-10 px-1">
                Order Ready
            </button>

        </div>
    )
}

export default ViewCartCompo