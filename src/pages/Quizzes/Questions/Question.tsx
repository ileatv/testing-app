//React components
import { FC, useEffect, useState } from 'react';

//Next components
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Types
import { Options, Questions, QuizData } from "../types";

//Styles
import quiz from '../../../styles/Quiz/Question.module.css';

const Question: FC = () => {
    const router = useRouter();
    // const questionsFromQuery = JSON.parse(router.query.questions as string);

    // const [questions, setQuestions] = useState<Questions[]>(questionsFromQuery);

    // console.log(questions);

    // useEffect(() => {
    //     setQuestions(questionsFromQuery);
    // }, [questionsFromQuery]);

    // console.log("Лист вопросов:", questions);

    return (
        <>
            <Head>
                <title>Testing App - Тестирование</title>
            </Head>

            <main className={quiz.main}>
                <div className={quiz.main__content}>
                    <nav className={quiz.nav}>
                        <p className={quiz.nav__questionCounter}>Вопрос 1 из 6</p>

                        <div className={quiz.nav__links}>
                            <Link href="#" className={`${quiz.nav__link} ${quiz.nav__link_active}`}></Link>
                            <Link href="#" className={quiz.nav__link}></Link>
                            <Link href="#" className={quiz.nav__link}></Link>
                            <Link href="#" className={quiz.nav__link}></Link>
                            <Link href="#" className={quiz.nav__link}></Link>
                            <Link href="#" className={quiz.nav__link}></Link>
                        </div>

                        {/* <p className={quiz.nav__timer}>Осталось времени {formatTime(remainingTime)}</p> */}
                        <p className={quiz.timer}>Осталось времени 30:00</p>
                    </nav>

                    <form className={quiz.form}>
                        <fieldset className={quiz.form__content}>
                            <legend className={quiz.form__title}>Что такое инкапсуляция в ООП?</legend>

                            <div className={quiz.form__answers}>
                                <label htmlFor="answer1" className={quiz.answer}>
                                    <input type="checkbox" id="answer1" className={quiz.answer__input} />
                                    <span className={quiz.answer__checkbox}></span>
                                    <span className={quiz.answer__text}>Процесс разделения программы на модули</span>
                                </label>

                                <label htmlFor="answer2" className={quiz.answer}>
                                    <input type="checkbox" id="answer2" className={quiz.answer__input} />
                                    <span className={quiz.answer__checkbox}></span>
                                    <span className={quiz.answer__text}>Механизм скрытия внутренних данных и методов класса</span>
                                </label>

                                <label htmlFor="answer3" className={quiz.answer}>
                                    <input type="checkbox" id="answer3" className={quiz.answer__input} />
                                    <span className={quiz.answer__checkbox}></span>
                                    <span className={quiz.answer__text}>Процесс преобразования кода программы в машинный код</span>
                                </label>
                            </div>
                        </fieldset>
                    </form>

                    <footer className={quiz.footer}>
                        <button type='button' title='Ответить на вопрос' className={quiz.footer__answerBtn}>Ответить</button>

                        <div className={quiz.footer__group}>
                            <button type='button' title='Предыдущий вопрос' className={quiz.footer__prevBtn}></button>
                            <button type='button' title='Следующий вопрос' className={quiz.footer__nextBtn}></button>
                        </div>

                        <button type='button' title='Завершить тестирование' className={quiz.footer__finishBtn}>Завершить работу</button>
                        {/* onClick={finishHandler} */}
                    </footer>
                </div>
            </main>
        </>
    )
}

export default Question;