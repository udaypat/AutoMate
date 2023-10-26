// import { Link } from 'react-router-dom';
import { RegisterForm } from "@/components/RegisterForm"


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
    )
}