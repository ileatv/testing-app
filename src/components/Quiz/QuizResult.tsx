import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const QuizResults = () => {
    const [results, setResults] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [skippedAnswers, setSkippedAnswers] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            const result = await axios.get(`/api/quizzes/${router.query.id}/results`);
            setResults(result.data);
        };
        fetchResults();
    }, [router.query.id]);

    useEffect(() => {
        if (!results) return;

        let correct = 0;
        let incorrect = 0;
        let skipped = 0;

        results.forEach((result) => {
            result.answers.forEach((answer) => {
                if (answer.selectedOption === answer.correctOption) {
                    correct++;
                } else if (answer.selectedOption !== null) {
                    incorrect++;
                } else {
                    skipped++;
                }
            });
        });

        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setSkippedAnswers(skipped);
    }, [results]);

    const data = {
        labels: ["Правильные", "Неправильные", "Пропущенные"],
        datasets: [
            {
                label: "Результаты",
                data: [correctAnswers, incorrectAnswers, skippedAnswers],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    if (!results) return <div>Loading...</div>;

    return (
        <div>
            <h1>Результаты</h1>
            <Pie data={data} />
            <table>
                <thead>
                    <tr>
                        <th>Имя пользователя</th>
                        <th>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result._id}>
                            <td>{result.username}</td>
                            <td>{result.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizResults;