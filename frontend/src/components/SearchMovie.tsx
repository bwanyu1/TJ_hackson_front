import { useEffect, useState } from "react";
import axios from "axios";
import RecomendMovie from "./RecomendMovie";
import { RotatingSquare } from 'react-loader-spinner'
import RandomMovie from "./RandomMovie";

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
    recommended_movies: MovieInfo;
    match_score: number;
};


export default function SearchMovie() {
    const [keywords, setKeywords] = useState<{[key: string]: number}>({}); //検索用キーワード
    const [country, setCountry] = useState<string | null>(null); //選択された製作国
    const [genre, setGenre] = useState<string | null>(null); //genresの中から選択された１つ
    const [movies, setMovie] = useState<RecomendMovie[]>([]); //responseで返ってきた映画情報

    const [randomMovie, setRandomMovie] = useState<MovieInfo[]>([]); //ランダム映画情報

    const [loading, setLoading] = useState<boolean>(false); //ローディング状態

    const country_list = ["邦画","洋画"]; //製作国
    const genres = ["アニメ","実写"]; //ジャンルのリスト
    const emotions_list = ["ワクワク感","喜び","恐怖","悲しみ","驚き"]; //感情のリスト

    //感情の日本語と英語のマッピング
    const emotionMap: {[key: string]: string} = {
        "ワクワク感": "excitement",
        "喜び": "joy",
        "恐怖": "fear",
        "悲しみ": "sadness",
        "驚き": "surprise",
    };

    //感情のスライダーの値を更新する関数
    const handleKeyword = (em: string, e: string) => {
        setKeywords((prev) => ({
            ...prev,
            [em]: e ? parseInt(e) : 0, // 入力が空の場合は0に設定
        }));
    };

    //検索ボタンが押されたときの処理
    const handleSubmit = async() => {
        setLoading(true); // ローディング開始
        setRandomMovie([]); // 既存のランダム映画情報をクリア
        //感情のキーワードを英語に変換
        const convertKeywords: { [key: string]: number } = {};
        Object.entries(keywords).forEach(([jp, val]) => {
            const en = emotionMap[jp];
            if (en) {
            convertKeywords[en] = val;
            }
        });
        try {
            const response = await axios.post('https://790b5bab-503e-4fd4-8297-770067dfb8bd-00-1pw0s8r1cl5hi.sisko.replit.dev/movies/recommend', {
                region: country,
                format_type: genre,
                emotions: convertKeywords,
            })
            console.log("Response:", response.data);
            setMovie(response.data);
            setLoading(false); // ローディング終了
        } catch (error) {
            console.error("Error axios:", error);
        }
    };

    //おまかせボタンが押されたときの処理
    const handleRandom = async() => {
        setLoading(true); // ローディング開始
        setMovie([]); // 既存の映画情報をクリア
        try {
            const response = await axios.get('https://790b5bab-503e-4fd4-8297-770067dfb8bd-00-1pw0s8r1cl5hi.sisko.replit.dev/movies/random_recommend')
            console.log("Response:", response.data);
            setRandomMovie(response.data.recommended_movies);
            setCountry(response.data.region); // レスポンスから製作国を設定
            setGenre(response.data.format_type); // レスポンスからジャンルを設定
            //レスポンスの感情を英語から日本語に変換してキーワードを更新
            const convertedKeywords: {[key: string]: number} = {};
            Object.entries(response.data.emotions).forEach(([en, val]) => {
                const jp = Object.keys(emotionMap).find(key => emotionMap[key] === en);
                if (jp) {
                    convertedKeywords[jp] = Number(val);
                }
            }
            );
            setKeywords(convertedKeywords); // 感情のキーワードを更新
            setLoading(false); // ローディング終了
        } catch (error) {
            console.error("Error axios:", error);
        }
    };

    //マウント時に感情の初期値を設定
    useEffect(() => {
        const initialKeywords: {[key: string]: number} = {};
        emotions_list.forEach((em) => {
            initialKeywords[em] = 0; // 初期値は0
        });
        setKeywords(initialKeywords);
    }, []);

    return (
        <div className="kaisei-opti-regular bg-[#F5F0E1] rounded-lg shadow-lg p-8 overflow-x-hidden"> {/* 白枠 */}
            <header className="text-center text-3xl font-bold text-[#1C1C1C] py-4">えいが　れこめんど</header>
            <div> {/* 入力部分 */}
                <div className="flex justify-center space-x-16">
                    <div>
                        <h2 className="text-lg font-bold my-1">製作国</h2>
                        <div className="flex">
                            {country_list.map((co) => (
                            <button
                                key={co}
                                onClick={() => setCountry(co)}
                                className={`px-4 py-2 rounded-full border text-sm transition-colors 
                                    ${country === co
                                    ? "bg-[#B11226] text-white border-[#B11226]"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`
                                }
                            >
                                {co}
                            </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold my-1">ジャンル</h2>
                        <div className="flex">
                            {genres.map((g) => (
                            <button
                                key={g}
                                onClick={() => setGenre(g)}
                                className={`px-4 py-2 rounded-full border text-sm transition-colors 
                                    ${genre === g
                                    ? "bg-[#B11226] text-white border-[#B11226]"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`
                                }
                            >
                                {g}
                            </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-6">
                    <h2 className="text-lg font-bold">感情</h2>
                    <div className="w-60">
                        {emotions_list.map((em) => (
                        <div key={em} className="">
                            <label className="text-sm block mb-1">
                                {em}
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    className="w-full h-2 bg-white rounded-lg appearance-none accent-[#B11226]"
                                    min="0"
                                    max="100"
                                    value={keywords[em] || 0}
                                    onChange={(e) => handleKeyword(em, e.target.value)}
                                />
                                <span className="w-3 text-right">{keywords[em] || 0}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="flex justify-center mt-2 space-x-8">
                    <button
                        className="mt-4 px-6 py-2 bg-[#B11226] text-white rounded hover:bg-[#9E0F20] transition-colors"
                        onClick={handleSubmit}
                        >
                        検索
                    </button>
                    <button
                        className="mt-4 px-6 py-2 bg-[#B11226] text-white rounded hover:bg-[#9E0F20] transition-colors"
                        onClick={handleRandom}
                        >
                        おまかせ
                    </button>
                </div>
                <div className="flex justify-center mt-6">
                    {loading && 
                    <RotatingSquare
                        visible={true}
                        height="100"
                        width="100"
                        color="#B11226"
                        ariaLabel="rotating-square-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    }
                </div>
            </div>
            {movies.length > 0 && (
                <div>
                    <RecomendMovie movies={movies} />
                </div>
            )}
            {randomMovie.length > 0 && (
                <div>
                    <RandomMovie randommovies={randomMovie}/>
                </div>
            )}
        </div>
    )
}