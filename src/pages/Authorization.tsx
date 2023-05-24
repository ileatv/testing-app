//React components
import { FC, useState } from "react";

//Next components
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

//Redux
import { useAppDispatch } from "../store";
import { loginUser } from '@/store/auth/actionCreators';

//Axios
import axios from 'axios';

//Formik components
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Types
import { ILoginRequest } from '../api/auth/types';

//Validation
import * as Yup from "yup";

//Styles and images
import auth from "../styles/Auth&Reg/Authorization.module.css";
import logo from "../assets/img/logo.png";

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
    //Хук для получения метода dispatch из ../store
    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: '',
    });

    const router = useRouter();

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
        setTimeout(() => {
            //Преобразуем приходящий объект в строку JSON
            alert(JSON.stringify(values, null, 2));
            //Когда пользователь отправляет форму, Formik устанавливает значение isSubmitting в true, чтобы указать, 
            //что форма находится в процессе отправки. В это время пользователь не может отправить форму повторно. 
            //Как только процесс отправки завершен, значение isSubmitting должно быть сброшено обратно на false, 
            //чтобы пользователь мог отправить форму вновь.
            setSubmitting(false);
        }, 400);

        // await fetch('https://api.pfctngr.ru/', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'include',
        //     body: JSON.stringify(values),
        // });

        // await axios.post('https://api.pfctngr.ru/', values, {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true,
        // });

        await router.push('/Dashboard/Dashboard');

        dispatch(loginUser(values));
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

                                <Image
                                    src={logo}
                                    alt="TestingApp logo"
                                    className={auth.authForm__logo}
                                />

                                <div className={auth.authForm__field}>
                                    <Field
                                        type="username"
                                        id="username"
                                        name="username"
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

                            </fieldset>
                        </Form>
                    </main>
                )}
            </Formik >
        </>
    )
}

export default Authorization;