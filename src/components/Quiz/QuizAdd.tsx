import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const NewQuiz = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await axios.post("/api/quizzes", { title, description });
        router.push(`/quizzes/${result.data._id}`);
    };

    return (
        <div>
            <h1>Создать новый квиз</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default NewQuiz;