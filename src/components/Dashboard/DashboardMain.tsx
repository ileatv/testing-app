//React components
import { FC, useEffect, useState } from 'react';

//CoreUI components
import { CContainer } from '@coreui/react';

//Dashboard components and styles
import dashMain from '../../styles/DashBoard/DashboardMain.module.css';
import axios from 'axios';

const DashboardMain: FC = () => {

    //Тестирование запроса на получение теста
    const [quizzes, setQuizzes] = useState({
        id: "2",
        testName: "",

    });

    const fetchQuizzes = async () => {
        try {
            const result = await axios.post(
                "https://api.pfctngr.ru/test/GetQuestions", quizzes.id, {

                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setQuizzes(result.data);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handlerGetQuizzes = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        fetchQuizzes();
    }

    return (
        <>
            <main className={dashMain.main}>
                <CContainer fluid>
                    <section className={dashMain.main__content}>
                        <div className={dashMain.main__group}>
                            <h1 className={dashMain.main__title}>Доступные тестовые задания</h1>
                            <button type="button" className={dashMain.updateBtn} onClick={fetchQuizzes} title='Получить доступные тестовые задания для выполнения'>
                                Обновить список
                            </button>
                        </div>

                        {
                            quizzes.testName !== "" &&
                            <div className={dashMain.quizzes}>
                                {/* <p className={dashMain.quizzes__id}>Тест №{quizzes.id}</p> */}

                                <h3 className={dashMain.quizzes__title}>
                                    Тема: <span>{quizzes.testName}</span>
                                </h3>

                                <p className={dashMain.quizzes__description}>В данном тестировании вы можете проверить свои познания в области объектно-ориентированного программирования...</p>

                                <button type="button" className={dashMain.quizzes__btn} onClick={handlerGetQuizzes} title={`Начать тестирование по теме "${quizzes.testName}"`}>Начать тестирование</button>
                            </div>
                        }
                    </section>
                </CContainer>
            </main>
        </>
    )
}

export default DashboardMain;