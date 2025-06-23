import { useEffect, useRef, useState } from "react"
import { filterSearch, GetGener } from "../requests/apiService"

export default function Form({ showMovie }) {

    const [movie, setMovie] = useState({});
    const [message, setMessage] = useState('')

    const [geners, setGeners] = useState([]);
    useEffect(() => {
        const fetchGeners = async () => {
            const geners = await GetGener();
            console.log(geners)
            setGeners(geners[1])
        }

        fetchGeners();


    }, [])

    const [year, setYear] = useState(Math.floor(new Date().getFullYear() - (25 / 2)));
    const [rate, setRate] = useState(0);
    const [genre, setGenre] = useState(18);

    const genreRef = useRef('');
    const yearRef = useRef('');
    const rateRef = useRef('');

    const handleYearChange = (e) => {
        setYear(e.target.value)
    }

    const handlesubmit = async (e) => {

        e.preventDefault();
        console.log(genre)
        setGenre(genreRef.current?.value)
        setYear(yearRef.current?.value)
        setRate(rateRef.current?.value)

        console.log(genre)

        const movie = await filterSearch(genre, year, rate)
        setMovie(movie)
        if (movie == undefined) {
            setMessage(`We couldn't find something random for you to watch.Let's try again!`);
            setTimeout(() => setMessage(''), 5000)
        }

        showMovie(movie)
    }

    return <>
        <h2>Filter Options:</h2>
        <form action="submit" onSubmit={handlesubmit}>

            <div>
                <p>Genres:</p>
                <span>
                    <select name="geners" id="geners" ref={genreRef} onChange={(e) => setGenre(e.target.value)}>
                        {geners.map((gener, index) => {
                            return <option key={index} value={gener.id}>{gener.name}</option>
                        })}
                    </select>
                </span>
            </div>
            <div>
                <p>Year:</p>
                <span className="showYear">{year}</span>
                <span><input type="range" name="year-slider" id="year-slider" min={2000} max={new Date().getFullYear()} onChange={handleYearChange} ref={yearRef} /></span>
            </div>
            <div>
                <p>Minimum Rating:</p>
                <span><input type="number" min={0} max={10} ref={rateRef} /></span>
            </div>

            <button id='button'>Surprise me!</button>

        </form>
        {message && <div className="error-section">
            <p>{message}</p>
        </div>}

    </>
}