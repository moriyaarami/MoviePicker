export default function ShowMovie({ movie, currentGeners }) {
    return <>
        {Object.keys(movie).length > 0 &&
            <>
                <div className="image">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="the poster of the movie" />
                </div>


                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>

                <p className='generד'>
                    {currentGeners.map((gener, index) => {
                        return <span key={index} className='gener'>{gener.name}</span>
                    })}
                </p>
                <p>{movie.release_date}</p>
                <p><span>{Math.floor(movie.vote_average)}⭐</span></p>
                {/*     {movie.video ? (console.log('true')) : (console.log('false'))} */}
            </>
        }
    </>
}