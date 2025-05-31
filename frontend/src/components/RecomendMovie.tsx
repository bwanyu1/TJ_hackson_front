type RecomendMovie = {
    id: number;
    title: string;
    excitement: number;
    joy: number;
    fear: number;
    sadness: number;
    surprise: number;
};

export default function RecomendMovie({ movies }: {movies: RecomendMovie[] }) {
    return (
        <div className="">
            <h1 className="text-center text-2xl font-bold pt-5">おすすめ映画</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {movies.map((movie) => (
                    <div
                    key={movie.id}
                    className="w-60 bg-white border border-gray-300 rounded-lg shadow p-4"
                    >
                    <h2 className="text-lg font-bold text-[#B11226] mb-2">{movie.title}</h2>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>ワクワク感: {movie.excitement}</li>
                        <li>喜び: {movie.joy}</li>
                        <li>恐怖: {movie.fear}</li>
                        <li>悲しみ: {movie.sadness}</li>
                        <li>驚き: {movie.surprise}</li>
                    </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}