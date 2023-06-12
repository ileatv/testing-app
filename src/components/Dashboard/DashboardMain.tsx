//React components
import { FC, useEffect, useState } from 'react';

//CoreUI components
import { CContainer } from '@coreui/react';

//Axios components
import axios from 'axios';

//Next components
import { useRouter } from 'next/router';

//Dashboard components and styles
import dashMain from '../../styles/DashBoard/DashboardMain.module.css';
import QuizPage from '@/pages/Quiz/QuizPage';

//Types
import { QuizData } from '@/pages/Quiz/types';


const DashboardMain: FC = () => {

    //Тестирование запроса на получение теста
    const [quizzes, setQuizzes] = useState<QuizData>();
    // const [showQuizPage, setShowQuizPage] = useState(false);

    const router = useRouter();

    const fetchQuizzes = async () => {
        try {
            const result = await axios.post<QuizData>(
                "https://api.pfctngr.ru/test/GetQuestions", 2, {

                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // setQuizzes(result.data);
            return setQuizzes(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerGetQuizzes = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await fetchQuizzes();
        console.log(quizzes?.responseEntities);
        // setShowQuizPage(true);
    }

    const routerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        router.push('/Quiz/QuizPage');
    }

    return (
        <>
            <main className={dashMain.main}>
                <CContainer fluid>
                    <section className={dashMain.main__content}>
                        <div className={dashMain.main__group}>
                            <h1 className={dashMain.main__title}>Доступные тестовые задания</h1>
                            <button type="button" className={dashMain.updateBtn} onClick={handlerGetQuizzes} title='Получить доступные тестовые задания для выполнения'>
                                Обновить список
                            </button>
                        </div>

                        {
                            quizzes ? (
                                <div className={dashMain.quizzes}>

                                    <h3 className={dashMain.quizzes__title}>
                                        Тема: <span>{quizzes?.testName}</span>
                                    </h3>

                                    <p className={dashMain.quizzes__description}>В данном тестировании вы можете проверить свои познания в области объектно-ориентированного программирования...</p>

                                    <button type="button" className={dashMain.quizzes__btn} onClick={routerHandler} title={`Начать тестирование по теме "${quizzes?.testName}"`}>Начать тестирование</button>
                                </div>
                            ) : <h2 className={dashMain.quizzes__subtext}>Пока нет доступных тестовых заданий :(</h2>
                        }
                    </section>
                </CContainer>
            </main>

            {router.pathname === '/Quiz/QuizPage' && <QuizPage questions={quizzes?.responseEntities} />}
        </>
    )
}

export default DashboardMain;