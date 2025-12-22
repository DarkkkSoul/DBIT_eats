import React from 'react'

function FoodItem(props) {

    const handleSoldOut = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cafeteria/sold-out/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // console.log(data.message);
            } else {
                console.log(data.errorMessage);
            }

        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    const handleAvaliable = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cafeteria/item-available/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // console.log(data.message);
            } else {
                console.log(data.errorMessage);
            }

        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    return (
        <div className='bg-gradient-to-tl from-fuchsia-300 to-fuchsia-700 flex flex-col justify-center gap-y-2 px-6 py-3 text-white tracking-wide font-semibold rounded-md border-1 border-white shadow-xl relative'>
            <div className='justify-between items-center'>
                <div>{props.foodName}</div>
                <div>{props.price} Rs</div>
            </div>

            <div className='absolute -bottom-4 -right-3 text-sm'>
                <button onClick={() => { handleSoldOut(props.id) }} className={`bg-red-600 px-2 py-1 rounded-md ${props.soldOut ? 'hidden' : 'block'} cursor-pointer`}>
                    Sold
                </button>
                <button onClick={() => { handleAvaliable(props.id) }} className={`bg-green-500 px-2 py-1 rounded-md ${props.soldOut ? 'block' : 'hidden'} cursor-pointer`} >
                    Avaliable
                </button>
            </div>
        </div >
    )
}

export default FoodItem