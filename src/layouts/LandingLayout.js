import React from 'react'
import { Outlet } from 'react-router-dom'

function LandingLayout() {
    return (
        <div className='bg-white min-h-screen'>
            <Outlet />
        </div>
    )
}

export default LandingLayout

