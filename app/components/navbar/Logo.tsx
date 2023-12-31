'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div 
            onClick={handleLogoClick} 
            className='
                items-center 
                justify-center 
                flex 
                gap-2
                cursor-pointer
            '>
            
            <div>
                <h1 
                    className='
                    font-semibold 
                    text-2xl 
                    text-purple-500
                '>
                    CODE REAPER
                </h1>
            </div>
        </div>

    )
}
export default Logo;