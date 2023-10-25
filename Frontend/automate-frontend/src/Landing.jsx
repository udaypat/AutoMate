import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';
import { buttonVariants } from "@/components/ui/button"
import { RegisterForm } from "@/components/RegisterForm"
// import Image from "next/image"


export default function Landing() {
    return (
        <>
            <div className="row">
                <div className="col-6" style={{
                    backgroundImage: 'url(/bg_landing.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}>
                    <h1 className="fw-bold text-body-emphasis text-center" style={{ fontSize: '55px', position: 'absolute', top: '20%', left: '38%', transform: 'translate(-50%, -50%)' }}>
                        AutoMate
                    </h1>
                </div>
                <div className="col-1" ></div>
                <div className="col-4 p-3 m-5" style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '20px' }}>
                    <h1 className="fw-bold text-body-emphasis text-center" style={{ fontSize: '25px' }}>
                        Create an account
                    </h1>
                    <RegisterForm />
                </div>
            </div>
        </>
        // <>
        //     {/* <div className="md:hidden">
        //         <Image
        //             src="./bg.png"
        //             width={1280}
        //             height={843}
        //             alt="Authentication"
        //         />
        //     </div> */}
        //     <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        //         {/* <Link
        //             to="/login"
        //             className={cn(
        //                 buttonVariants({ variant: "ghost" }),
        //                 "absolute right-4 top-4 md:right-8 md:top-8"
        //             )}
        //         >
        //             Login
        //         </Link> */}

        //         <div className="relative  h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        //             <div className="absolute inset-0 bg-slate-600" />
        //             <div style={{ backgroundImage: 'url(./public/bg_landing.jpg)', backgroundSize: 'cover' }} className="absolute inset-0"></div>
        //             {/* <div className="absolute inset-0" style={{ backgroundImage: url('your-image-url.jpg') }}; background-size: cover;"></div> */}
        //             <div className="relative z-20 flex items-center text-lg font-medium">
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     viewBox="0 0 24 24"
        //                     fill="none"
        //                     stroke="currentColor"
        //                     strokeWidth="2"
        //                     strokeLinecap="round"
        //                     strokeLinejoin="round"
        //                     className="mr-2 h-6 w-6"
        //                 >
        //                     <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        //                 </svg>
        //                 AutoMate
        //             </div>
        //             <div className="relative z-20 mt-auto">
        //                 <blockquote className="space-y-2">
        //                     <p className="text-lg">
        //                         &ldquo;Baby Shark, doo-doo, doo-doo, doo-doo.&rdquo;
        //                     </p>
        //                     <footer className="text-sm">Larry</footer>
        //                 </blockquote>
        //             </div>
        //         </div>
        //         <div className="lg:p-3">
        //             <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        //                 <div className="flex flex-col space-y-2 text-center">
        //                     <h1 className="text-2xl font-semibold tracking-tight">
        //                         Create an account
        //                     </h1>
        //                 </div>
        //                 <RegisterForm />
        //             </div>
        //         </div>
        //     </div >
        // </>
    )
}