// //React components
// import { FC, useEffect, useState } from 'react';

// //Next components
// import Head from 'next/head';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// //Types
// import { Options, Questions, QuizData } from "../types";

// //Styles
// import quiz from '../../styles/Quiz/QuizPage.module.css';

// const Question: FC = () => {
//     const router = useRouter();
//     const questionsFromQuery = JSON.parse(router.query.questions as string);

//     const [questions, setQuestions] = useState<Questions[]>(questionsFromQuery);

//     console.log(questions);

//     useEffect(() => {
//         setQuestions(questionsFromQuery);
//     }, [questionsFromQuery]);

//     console.log("Лист вопросов:", questions);

//     return (
//         <>
//             {/* <ul>
//                 {questions.map((item, id) => (
//                     <li key={id}>{item.questionText}</li>
//                 ))}
//             </ul> */}

//             {/* <h1>{currentQuestion.questionText}</h1>
//             <ul>
//                 {currentQuestion.responseEntityOptions.map((option) => (
//                     <li key={option.id}>
//                         <button type="button" onClick={() => handleAnswer(option.right)}>
//                             {option.optionText}
//                         </button>
//                     </li>
//                 ))}
//             </ul> */}
//             <Head>
//                 <title>Testing App - Тестирование</title>
//             </Head>

//             <main className={quiz.main}>
//                 <div className={quiz.main__content}>
//                     <nav className={quiz.nav}>
//                         <p className={quiz.nav__questionCounter}>Вопрос 1 из 6</p>

//                         <div className={quiz.nav__links}>
//                             <Link href="#" className={`${quiz.nav__link} ${quiz.nav__link_active}`}></Link>
//                             <Link href="#" className={quiz.nav__link}></Link>
//                             <Link href="#" className={quiz.nav__link}></Link>
//                             <Link href="#" className={quiz.nav__link}></Link>
//                             <Link href="#" className={quiz.nav__link}></Link>
//                             <Link href="#" className={quiz.nav__link}></Link>
//                         </div>

//                         <p className={quiz.nav__timer}>Осталось времени {formatTime(remainingTime)}</p>
//                     </nav>

//                     <form className={quiz.form}>
//                         <fieldset className={quiz.form__content}>
//                             <legend className={quiz.form__title}>Что такое инкапсуляция в ООП?</legend>

//                             <div className={quiz.form__answers}>
//                                 <div className={quiz.form__answer}>
//                                     <input type="checkbox" id="answer1" className={quiz.form__checkbox} />
//                                     <label htmlFor="answer1" className={quiz.form__label}>Процесс разделения программы на модули</label>
//                                 </div>

//                                 <div className={quiz.form__answer}>
//                                     <input type="checkbox" id="answer2" className={quiz.form__checkbox} />
//                                     <label htmlFor="answer2" className={quiz.form__label}>Механизм скрытия внутренних данных и методов класса</label>
//                                 </div>

//                                 <div className={quiz.form__answer}>
//                                     <input type="checkbox" id="answer3" className={quiz.form__checkbox} />
//                                     <label htmlFor="answer3" className={quiz.form__label}>Процесс преобразования кода программы в машинный код</label>
//                                 </div>

//                                 <div className={quiz.form__answer}>
//                                     <input type="checkbox" id="answer4" className={quiz.form__checkbox} />
//                                     <label htmlFor="answer4" className={quiz.form__label}>Процесс разделения программы на модули</label>
//                                 </div>
//                             </div>
//                         </fieldset>
//                     </form>

//                     <footer className={quiz.footer}>
//                         <button type='button' title='Ответить на вопрос' className={quiz.footer__answerBtn}>Ответить</button>

//                         <div className={quiz.footer__group}>
//                             <button type='button' title='Предыдущий вопрос' className={quiz.footer__prevBtn}></button>
//                             <button type='button' title='Следующий вопрос' className={quiz.footer__nextBtn}></button>
//                         </div>

//                         <button type='button' title='Завершить тестирование' className={quiz.footer__finishBtn} onClick={finishHandler}>Завершить работу</button>
//                     </footer>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Question;