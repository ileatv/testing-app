import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Quiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [remainingTime, setRemainingTime] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchQuiz = async () => {
            const result = await axios.get(`/api/quizzes/${router.query.id}`);
            setQuiz(result.data);
        };
        fetchQuiz();
    }, [router.query.id]);

    useEffect(() => {
        if (!quiz) return;

        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [quiz]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await axios.post(`/api/quizzes/${quiz._id}/results`, answers);

        router.push(`/quizzes/${quiz._id}/results/${result.data._id}`);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
            {remainingTime !== null && remainingTime <= 0 ? (
                <div>Время вышло!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {quiz.questions.map((question) => (
                        <div key={question._id}>
                            <h3>{question.text}</h3>
                            {question.options.map((option) => (
                                <div key={option._id}>
                                    <input
                                        type="radio"
                                        id={option._id}
                                        name={question._id}
                                        value={option._id}
                                        checked={answers[question._id] === option._id}
                                        onChange={() => handleAnswerChange(question._id, option._id)}
                                    />
                                    <label htmlFor={option._id}>{option.text}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Отправить</button>
                </form>
            )}
        </div>
    );
};

export default Quiz;