import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';

function Loading() {
    return (
        <div className='flex h-screen w-screen flex-col justify-center items-center bg-slate-100'>
            <CircularProgress
                sx={{
                    "--CircularProgress-size": "70px",
                    "--CircularProgress-trackThickness": "11px"
                }}
            /></div>
    )
}

export default Loading