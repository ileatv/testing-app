//React components
import { useState } from "react";

//Next components
import { useRouter } from 'next/router';

//Axios components
import axios from 'axios';

//Types
import { Questions, QuizData } from '@/pages/Quizzes/types';

//Styles and images
import quizList from '../../styles/Quiz/QuizList.module.css';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState<QuizData>();
    const [questions, setQuestions] = useState<Questions[]>();

    const router = useRouter();

    const fetchQuizzes = async () => {
        try {
            const result = await axios.post<QuizData>(
                "https://api.pfctngr.ru/test/GetQuestions", 2, {

                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setQuizzes(result.data);
            setQuestions(result.data.responseEntities);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerGetQuizzes = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetchQuizzes();
    }

    const routerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(quizzes);
        console.log(questions);
        router.push({
            // pathname: `/Quizzes/Questions/${questions?.map(question => question.id)}`,
            pathname: `/Quizzes/Questions/Question`,
            // query: { questions: JSON.stringify(questions?.filter(question => question.id === 1)) },
            // query: { questions: JSON.stringify(questions) },
        });
    }

    return (
        <>
            <div className={quizList.quizzes}>
                <div className={quizList.quizzes__group}>
                    <h1 className={quizList.quizzes__title}>Доступные тестовые задания</h1>
                    <button type="button" className={quizList.updateBtn} onClick={handlerGetQuizzes} title='Получить доступные тестовые задания для выполнения'>
                        Обновить список
                    </button>
                </div>

                {
                    quizzes ? (
                        <div className={quizList.quiz}>

                            <h3 className={quizList.quiz__title}>
                                Тема: <span>{quizzes?.testName}</span>
                            </h3>

                            <p className={quizList.quiz__description}>В данном тестировании вы можете проверить свои познания в области объектно-ориентированного программирования...</p>

                            <button type="button" className={quizList.quiz__btn} onClick={routerHandler} title={`Начать тестирование по теме "${quizzes?.testName}"`}>Начать тестирование</button>
                        </div>
                    ) : <h2 className={quizList.quiz__subtext}>Пока нет доступных тестовых заданий :(</h2>
                }
            </div>
        </>
    );
};

export default QuizList;
