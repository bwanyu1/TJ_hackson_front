interface RecomendMovieProps {
    movie: string;
}

export default function RecomendMovie({ movie }: RecomendMovieProps) {
    return (
        <div className="flex">
            <h1 className="text-2xl font-bold mb-4">おすすめ映画</h1>
            <p>{movie}</p>
        </div>
    );
}