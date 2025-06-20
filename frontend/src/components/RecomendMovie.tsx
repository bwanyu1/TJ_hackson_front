//MovieInfoの型定義
type MovieInfo = {
    id: number;
    title: string;
    excitement: number;
    joy: number;
    fear: number;
    sadness: number;
    surprise: number;
};

//resposeの型定義
type RecomendMovie = {
    match_score: number;
    recommended_movies: MovieInfo;
};


export default function RecomendMovie({ movies }: {movies: RecomendMovie[] }) {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold pt-5">おすすめ映画</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {movies.slice(0,3).map((movie, index) => (
                    <div
                    key={movie.recommended_movies?.id}
                    className="w-60 bg-white border border-gray-300 rounded-lg shadow p-4"
                    >
                    <h2 className="text-lg font-bold text-[#B11226] mb-2">
                        <span className="text-lg font-bold text-[#B11226] mb-2">{index + 1}.</span>
                        {movie && movie.recommended_movies?.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">マッチスコア: {movie.match_score}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>ワクワク感: {movie.recommended_movies?.excitement}</li>
                        <li>喜び: {movie.recommended_movies?.joy}</li>
                        <li>恐怖: {movie.recommended_movies?.fear}</li>
                        <li>悲しみ: {movie.recommended_movies?.sadness}</li>
                        <li>驚き: {movie.recommended_movies?.surprise}</li>
                    </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}