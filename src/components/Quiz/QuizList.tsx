import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const result = await axios.get("https://api.pfctngr.ru/GetQuestions");
            setQuizzes(result.data);
        };

        fetchQuizzes();
    }, []);

    return (
        <div>
            <h1>Список тестов</h1>

            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link href={`/quizzes/${quiz._id}`}>
                            <a>{quiz.title}</a>
                        </Link>
                    </li>
                ))}

                <Link href="/quizzes/new">
                    <a>Создать новый квиз</a>
                </Link>
            </ul>
        </div>
    );
};

export default QuizList;
