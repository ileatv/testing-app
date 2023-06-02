//React components
import { FC, useState, useEffect, FormEvent } from "react";

//Next components
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

//Redux
import { IRootState, useAppDispatch } from "../store";
import { loginUser } from '@/store/auth/actionCreators';

//Formik components
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Types
import { ILoginRequest } from '../api/auth/types';

//Validation
import * as Yup from "yup";

//Pages
import Dashboard from './Dashboard/Dashboard';

//Styles and images
import auth from "../styles/Auth&Reg/Authorization.module.css";

import logoWebp from "../assets/img/logo.webp";
import logoWebp2x from "../assets/img/logo2x.webp";
import logo from "../assets/img/logo.png";
import logo2x from "../assets/img/logo2x.png";
// import { compose } from '@reduxjs/toolkit';

//Типизация setSubmitting
type SetSubmitting = (isSubmitting: boolean) => void;

//Типизация FormValues
interface FormValues extends ILoginRequest { }

//Схема валидации
const LoginSchema = Yup.object().shape({
    username: Yup.string().email("Некорректный email").required("Email обязателен к заполнению").test({
        name: 'is-email',
        message: 'Введите корректный email',
        //Дополнительное правило валидации "test"
        test: (value: string | undefined) => {
            if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return false;
            }
            return true;
        },
    }),
    password: Yup.string().required("Пароль обязателен к заполнению"),
});

const Authorization: FC = () => {
    const [error, setError] = useState('');

    //Хук для получения метода dispatch из ../store
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: '',
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
        // setError('');

        setSubmitting(true);
        // setTimeout(() => {
        //     //Преобразуем приходящий объект в строку JSON
        //     alert(JSON.stringify(values, null, 2));
        //     //Когда пользователь отправляет форму, Formik устанавливает значение isSubmitting в true, чтобы указать, 
        //     //что форма находится в процессе отправки. В это время пользователь не может отправить форму повторно. 
        //     //Как только процесс отправки завершен, значение isSubmitting должно быть сброшено обратно на false, 
        //     //чтобы пользователь мог отправить форму вновь.
        //     // setSubmitting(false);
        // }, 400);

        // try {
        //     await dispatch(loginUser(values));

        //     await router.push('/Dashboard/Dashboard');
        // } catch (error: any) {
        //     console.log(error.response);

        //     if (error.response && error.response.status === 401) {
        //         console.log('1');
        //         setError('Ошибка: неверный логин или пароль');

        //         // else {
        //         //     setError('Ошибка: токен доступа устарел или неактивен');
        //         // }
        //     } else {
        //         console.log('2');

        //         setError('Ошибка: не удалось выполнить вход');
        //     }
        // }

        try {
            // const errorMessage = await dispatch(loginUser(values)); // Получаем errorMessage из loginUser
            // if (errorMessage !== undefined) {
            //     setError('Произошла ошибка при выполнении запроса'); // Устанавливаем ошибку, если она есть
            // } else {
            await dispatch(loginUser(values));

            // const errorMessage = await dispatch(loginUser(values)); // Получаем errorMessage из loginUser
            // if (errorMessage !== undefined) {
            //     setError('Произошла ошибка при выполнении запроса'); // Устанавливаем ошибку, если она есть
            // } else {

            await router.push('/Dashboard/Dashboard');
            // }
        } catch (error: any) {
            console.log(error.response);
            if (error.response && error.response.status) {
                setError('Ошибка: неверный логин или пароль');
            }
            else {
                setError('Произошла ошибка при выполнении запроса');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>Testing App - Авторизация</title>
            </Head>

            <Formik
                //Определяем начальные значения полей формы
                initialValues={formValues}
                //Определяем схему валидаци формы
                validationSchema={LoginSchema}
                //Определяем функцию обработки отправки формы
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                    //isSubmitting - булевое значение, указывающее, отправляется ли форма в настоящее время
                    //errors - объект, содержащий ошибки валидации формы
                    //touched - объект, содержащий информацию о том, какие поля были касались пользователи
                    //setFieldValue - функция, позволяющая установить значение поля формы
                    <main className={auth.main}>
                        <Form className={auth.authForm}>
                            <fieldset className={auth.authForm__fieldset}>

                                <picture className={auth.authForm__picture}>
                                    <source
                                        srcSet={`${logoWebp.src} 1x,
                                                 ${logoWebp2x.src} 2x`}
                                        type="image/webp"
                                    />

                                    <img
                                        src={logo.src}
                                        srcSet={`${logo2x.src} 2x`}
                                        alt="TestingApp - логотип"
                                        className={auth.authForm__logo}
                                    />
                                </picture>

                                {error && (
                                    <div className={auth.authForm__errorField}>
                                        <span className={auth.authForm__errorMessage}>{error}</span>
                                    </div>
                                )}

                                <div className={auth.authForm__field}>
                                    <Field
                                        type="username"
                                        id="username"
                                        name="username"
                                        autoComplete="on"
                                        className={`
                                            ${auth.authForm__input} ${errors.username && touched.username ? auth.authForm__input_error : ""
                                            }`}
                                        placeholder="Email"
                                        title="Введите Email"
                                        maxLength={254}
                                        value={formValues.username}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setFormValues({ ...formValues, username: e.target.value });
                                            setFieldValue("username", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="span"
                                        className={auth.authForm__error}
                                    />
                                </div>

                                <div className={auth.authForm__field}>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="on"
                                        className={`
                                            ${auth.authForm__input} ${errors.password && touched.password ? auth.authForm__input_error : ""
                                            }`}
                                        placeholder="Пароль"
                                        title="Введите пароль"
                                        maxLength={128}
                                        value={formValues.password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setFormValues({ ...formValues, password: e.target.value });
                                            setFieldValue("password", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className={auth.authForm__error}
                                    />
                                </div>

                                <button type="submit" disabled={isSubmitting} className={auth.authForm__btn} title='Войти в аккаунт'>
                                    Войти
                                </button>

                                <nav className={auth.authForm__nav}>
                                    <span className={auth.authForm__linkText}>У вас нет учетной записи? </span>
                                    <Link href="/Registration" className={auth.authForm__link} title='Перейти на страницу регистрации'>
                                        {/* Присоединяйтесь&nbsp;к нашему сообществу! */}
                                        Зарегистрируйтесь, чтобы продолжить
                                    </Link>
                                </nav>

                            </fieldset>
                        </Form>
                    </main>
                )}
            </Formik >

            {/* {router.pathname === '/Dashboard/Dashboard' && <Dashboard />} */}
        </>
    )
}

export default Authorization;