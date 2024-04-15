function About() {
    return (
        <div className="container-fluid font-monospace p-0">
            <h1 className="fw-bold text-center text-bg-danger shadow p-3">Streamify</h1>
            <div className="text-wrap p-4">
                <h3 className="fw-bold text-danger">About</h3>
                <p className="fs-5">
                    Streamify is a movie discovery app that helps the users to find details about the movies they love.
                    It is basically an academic project developed for the whole sole purpose of learning <a href="https://react.dev">React</a>.<br /><br />
                    The build tool used for this project is <a href="https://vitejs.dev/guide/"><strong>Vite</strong></a>!
                    <strong> Why??</strong><br /><br />
                    Well, because it is ⚡️ fast, and I am a beginner 😅. <em> Plus the React developer team recently removed <strong> create-react-app </strong> from the official documentation,</em> meaning, it is no longer the default method of setting up a new project in React. And fact check, this happened in 2023 😯, did you know that!
                    <br /><br />

                    <a href="https://getbootstrap.com"><strong>Bootstrap</strong></a> and <a href="https://react-bootstrap.github.io"><strong>React-Bootstrap</strong></a> were quite a lot of help in designing the application.
                </p>
                <p className="fs-5">
                    The app uses the <a href="https://www.themoviedb.org/documentation/api"><strong>The Movie Database (TMDb) API</strong></a> to fetch the movie data.
                    The details of the movies are fetched from the API and displayed to the user. The design of the app is also inspired by the TMDb website.
                </p>
                <hr />
                <h3 className="fw-bold text-danger">
                    The Team
                </h3>
                <p className="fs-5">
                    Haha! There is no team behind this project. How I wish, there was one, but, it is developed by a single person 😂, who is as new to React as you might be.
                    I am still a learner, so, if you find any bugs or have any suggestions, feel free to reach out to me at <a href="mailto:pinky.sodhi@gmail.com">my email</a>. I would love to hear from you. <br /><br />
                    Psst! please come with some easy peasy suggestions 😅 (You will be most welcome, if you come with coded suggestions 🤪).<br />
                    By the way, you can also find the code of this project on <a href="https://github.com/sodhipinky/streamify"><strong>GitHub</strong></a>.
                    {/* TODO: Put a link of GitHub Pages when the website is deployed */}
                </p>
                <hr />
                <h3 className="fw-bold text-danger">Contact Me</h3>
                <p className="fs-5">
                    If you find the project interesting (or boring), you can reach out to me at <a href="mailto:pinky.sodhi@gmail.com">my email</a> or connect with me on <a href="https://www.linkedin.com/in/pinkysodhi/">LinkedIn</a>.
                </p>
                <hr />
                <p>
                    <a href="https://www.linkedin.com/in/pinkysodhi/"><strong>@pinkysodhi</strong></a>
                </p>
            </div>
        </div>
    );
}
export default About;