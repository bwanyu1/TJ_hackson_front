import { useEffect, useState } from "react";
import axios from "axios";
import RecomendMovie from "./RecomendMovie";

export default function SearchMovie() {
    const [keywords, setKeywords] = useState<{[key: string]: number}>({}); //検索用キーワード
    const [country, setCountry] = useState<string | null>(null); //選択された製作国
    const [genre, setGenre] = useState<string | null>(null); //genresの中から選択された１つ
    const [movie, setMovie] = useState<string | null>(null); //返ってきた映画のタイトル

    const country_list = ["邦画","洋画"]; //製作国
    const genres = ["アニメ","実写"]; //ジャンルのリスト
    const emotions_list = ["ワクワク感","喜び","恐怖","悲しみ","驚き"]; //感情のリスト

    const handleKeyword = (em: string, e: string) => {
        setKeywords((prev) => ({
            ...prev,
            [em]: e ? parseInt(e) : 0, // 入力が空の場合は0に設定
        }));
    };

    const handleSubmit = async() => {
        console.log("製作国:", country);
        console.log("ジャンル:", genre);
        console.log("感情:", keywords);
        try {
            const response = await axios.post('エンドポイント', {
                country: country,
                genre: genre,
                emotions: keywords,
            })
            console.log("Response:", response.data);
            setMovie(response.data.movie);
        } catch (error) {
            console.error("Error axios:", error);
        }
    }

    //マウント時に感情の初期値を設定
    useEffect(() => {
        const initialKeywords: {[key: string]: number} = {};
        emotions_list.forEach((em) => {
            initialKeywords[em] = 0; // 初期値は0
        });
        setKeywords(initialKeywords);
    }, []);

    return (
        <div className="kaisei-opti-regular bg-[#F5F0E1] h-screen rounded-lg shadow-lg p-6"> {/* 白枠 */}
            <header className="text-center text-3xl font-bold text-[#1C1C1C] py-4">タイトル</header>
            <div className=""> {/* 入力部分 */}
                <div>
                    <h3>製作国</h3>
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
                    <h3>ジャンル</h3>
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

                <div>
                    <h3>感情</h3>
                    <div  className="flex"></div>
                        {emotions_list.map((em) => (
                        <div key={em} className="">
                            <label className="text-sm text-gray-700">
                                {em}
                            </label>
                            <input
                                type="number"
                                className="border rounded px-2 py-1 text-sm"
                                placeholder="パーセント"
                                min="0"
                                max="100"
                                value={keywords[em] || ""}
                                onChange={(e) => handleKeyword(em, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="mt-4 px-6 py-2 bg-[#B11226] text-white rounded hover:bg-[#9E0F20] transition-colors"
                    onClick={handleSubmit}
                    disabled={!genre || Object.keys(keywords).length === 0}
                    >
                    検索
                </button>
            </div>
            {movie && (
                <div>
                <RecomendMovie movie={movie ?? ""} />
                </div>
            )}
        </div>
    )
}