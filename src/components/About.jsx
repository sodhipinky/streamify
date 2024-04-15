function About() {
    return (
        <div className="container">
            <h1>About Streamify</h1>
            <p>
                Streamify is a movie discovery app that helps the users to find details about the movies they love.
                It is basically an academic project developed for the purpose of learning React and Bootstrap. <br />
                The build tool used for this project is <a href="https://vitejs.dev/guide/">Vite</a>.
                <br />
                <strong> Why??</strong><br />
                Well because it is fast, and I am a beginner 😅. <em> Plus the React developer team recently removed `&quotcreate-react-app&quot` from the official documentation, meaning, it is no longer the default method of setting up a new project in React. And fact check, this happened in 2023 😯, did you know that!</em>
            </p>
            <p>
                The app uses the <a href="https://www.themoviedb.org/documentation/api">The Movie Database (TMDb) API</a> to fetch the movie data.
                The details of the movies are fetched from the API and displayed to the user. The design of the app is also inspired by the TMDb website.
            </p>
            <h2>
                The Team
            </h2>
            <p>
                Haha! There is no team behind this project. It is developed by a single person 😂, who is as new to React as you might be.
                I am still a learner, so, if you find any bugs or have any suggestions, feel free to reach out to me at <a href="mailto:pinky.sodhi@gmail.com">Pinky Sodhi</a>. I would love to hear from you.
                Psst! please come with some easy peasy suggestions 😅 (You will be most welcome, if you come with coded suggestions 🤪).<br />
                By the way, you can also find the code of this project on <a href="https://github.com/sodhipinky/streamify">GitHub</a>.
                {/* TODO: Put a link of GitHub Pages when the website is deployed */}
            </p>
            <h2>Contact Me</h2>
            <p>
                If you find the project interesting (or boring), you can reach out to me at <a href="mailto:pinky.sodhi@gmail.com">My Email</a> or connect with me on <a href="https://www.linkedin.com/in/sodhipinky/">LinkedIn</a>.
            </p>
        </div>
    );
}
export default About;