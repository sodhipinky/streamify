import Logo from '../assets/favicon.ico'
import { useState } from 'react'

function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark font-monospace mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-2 text-white pe-2" href="#">
                        <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                        Streamify</a>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar