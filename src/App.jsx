import { useState, useCallback, useEffect } from "react";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        console.log('Fetch Run!');
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                "https://react-train-swapi-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
                {
                    headers: {
                        "content-type": "application/json",
                        accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const transformedMovies = [];

            for (let key in data) {
                transformedMovies.unshift({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }

            setMovies(transformedMovies);
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    async function addMovieHandler(movie) {
        const response = await fetch(
            "https://react-train-swapi-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    title: movie.title,
                    openingText: movie.openingText,
                    releaseDate: movie.releaseDate,
                }),
            }
        );

        if (!response.ok) return false;

        fetchMoviesHandler();

        return true;
    }

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </>
    );
}

export default App;
