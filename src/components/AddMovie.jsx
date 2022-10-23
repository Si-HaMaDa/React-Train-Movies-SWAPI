import React, { useRef, useState } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
    const titleRef = useRef("");
    const openingTextRef = useRef("");
    const releaseDateRef = useRef("");
    const [sending, setSending] = useState(false);

    function submitHandler(event) {
        event.preventDefault();
        if (
            !titleRef.current.value ||
            !openingTextRef.current.value ||
            !releaseDateRef.current.value
        )
            return false;

        setSending(true);

        // could add validation here...

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        };

        props.onAddMovie(movie).then((e) => {
            if (e) {
                titleRef.current.value = "";
                openingTextRef.current.value = "";
                releaseDateRef.current.value = "";
            }
            setSending(false);
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input
                    disabled={sending && "disabled"}
                    type="text"
                    id="title"
                    ref={titleRef}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="opening-text">Opening Text</label>
                <textarea
                    disabled={sending && "disabled"}
                    rows="5"
                    id="opening-text"
                    name="description"
                    ref={openingTextRef}
                ></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor="date">Release Date</label>
                <input
                    disabled={sending && "disabled"}
                    type="text"
                    id="date"
                    ref={releaseDateRef}
                />
            </div>
            <button>Add Movie</button>
        </form>
    );
}

export default AddMovie;
