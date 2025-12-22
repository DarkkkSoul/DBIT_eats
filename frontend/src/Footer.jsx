function Footer() {
    return (
        <div className='bg-gradient-to-l from-fuchsia-400 via-fuchsia-600  flex flex-row justify-between items-center px-16 py-2.5 text-400-istok text-sm'>
            <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-1.5'>
                    <div className='pt-0.5'>Developed By</div>
                    <a href="https://www.darksoul.space/" target='_blank'>
                        <img src="/creatorsImages/ds.png" className='w-7.5' />
                    </a>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div>Peace Out!</div>
                <div>&copy; 2025 Foobia. All rights reserved.</div>
            </div>
        </div>
    )
}

export default Footer