import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light mt-2 font-monospace">
                <div className="row">
                    <div className="col-md-6 ps-3 mt-3 ms-2">
                        <h5>Contact:</h5>
                        <p className="fs-5">
                            <a href="mailto:pinky.sodhi@gmail.com" className="text-white">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                            <a href="https://www.linkedin.com/in/pinkysodhi/" className="text-white ms-3">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="https://github.com/sodhipinky" className="text-white ms-3">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <p className="mb-2">&copy; {new Date().getFullYear()} Streamify. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;