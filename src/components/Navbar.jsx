function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark font-monospace mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-2 text-white pe-2" href="#">
                        <img src={'../src/assets/favicon.ico'} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                        Streamify</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar