import { useState } from "react";

function App() {
    const [genre, setGenre] = useState("fantasy");
    const [characters, setCharacters] = useState(2);
    const [paragraphs, setParagraphs] = useState(3);
    const [extraPrompt, setExtraPrompt] = useState("");
    const [story, setStory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setStory("");

        try {
            const res = await fetch("http://127.0.0.1:8000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ genre, characters, paragraphs, extraPrompt }),
            });

            const data = await res.json();
            setStory(data.story);
        } catch (err) {
            setStory("⚠️ Error generating story.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Pane */}
            <div className="w-1/3 bg-white p-6 shadow-md flex flex-col space-y-6">
                <h1 className="text-2xl font-bold mb-4">AI Story Generator</h1>

                {/* Genre Dropdown */}
                <div>
                    <label className="block mb-1 font-medium">Genre</label>
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="fantasy">Fantasy</option>
                        <option value="mystery">Mystery</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="adventure">Adventure</option>
                    </select>
                </div>

                {/* Characters Slider */}
                <div>
                    <label className="block mb-1 font-medium">
                        Number of Characters: {characters}
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={characters}
                        onChange={(e) => setCharacters(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Paragraphs Slider */}
                <div>
                    <label className="block mb-1 font-medium">
                        Number of Paragraphs: {paragraphs}
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* ✅ Additional Prompt Box */}
                <div>
                    <label className="block mb-1 font-medium">Additional Prompt</label>
                    <textarea
                        value={extraPrompt}
                        onChange={(e) => setExtraPrompt(e.target.value)}
                        className="w-full p-2 border rounded h-24"
                        placeholder="E.g., make it funny, set it in the future..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Generate Story
                </button>
            </div>

            {/* Right Pane */}
            <div className="w-2/3 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Generated Story</h2>
                <div className="bg-white shadow-md rounded p-4 min-h-[70vh]">
                    {loading ? (
                        <p className="text-gray-500 animate-pulse">✨ Generating your story...</p>
                    ) : (
                        <p className="whitespace-pre-line">{story}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
