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
import QuizPage from '@/pages/Quizzes/Questions/[Question]';

// import type { GetServerSideProps } from 'next';

// type QuizProps = {
//     quizzes: QuizData;
// }

// export const getServerSideProps: GetServerSideProps<QuizProps> = async () => {
//     try {
//         const result = await axios.post<QuizData>(
//             'https://api.pfctngr.ru/test/GetQuestions',
//             2,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         return {
//             props: {
//                 quizzes: result.data,
//             },
//         };
//     } catch (error) {
//         console.log(error);

//         return {
//             props: {
//                 quizzes: null,
//             },
//         };
//     }
// };

type MainProps = {
    children: React.ReactNode;
};

const DashboardMain: FC<MainProps> = ({ children }) => {

    // //Тестирование запроса на получение теста
    // const [quizzes, setQuizzes] = useState<QuizData>();
    // const [questions, setQuestions] = useState<Questions[]>();

    // const router = useRouter();

    // const fetchQuizzes = async () => {
    //     try {
    //         const result = await axios.post<QuizData>(
    //             "https://api.pfctngr.ru/test/GetQuestions", 2, {

    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         setQuizzes(result.data);
    //         setQuestions(result.data.responseEntities);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handlerGetQuizzes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     fetchQuizzes();
    // }

    // const routerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     console.log(quizzes);
    //     console.log(questions);
    //     router.push({
    //         // pathname: `/Quizzes/Questions/${questions?.map(question => question.id)}`,
    //         pathname: `/Quizzes/Questions/${questions?.filter(question => question.id === 1)}`,
    //         query: { questions: JSON.stringify(questions?.filter(question => question.id === 1)) },
    //     });
    // }

    return (
        <>
            <main className={dashMain.main}>
                <CContainer fluid>
                    <section className={dashMain.main__content}>
                        {children}
                    </section>
                </CContainer>
            </main>
        </>
    )
}

export default DashboardMain;