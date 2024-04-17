import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light p-3 mt-2 font-monospace">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Contact Us:</h5>
                        <p className="fs-5">
                            <a href="mailto:pinky.sodhi@gmail.com" className="text-white">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer;