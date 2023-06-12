//React components
import { FC, useEffect, useState } from 'react';

//Next components
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

//Formik components
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Types
import { IPerson } from '../api/auth/types';

//Validation
import * as Yup from 'yup';

//Styles and images
import reg from '../styles/Auth&Reg/Registration.module.css';
import axios from 'axios';

//Pages
import Authorization from '@/pages/Authorization';
import Quiz from '@/components/Quiz/QuizPage';

//Типизация setSubmitting
type SetSubmitting = (isSubmitting: boolean) => void;

//Типизация FormValues
interface FormValues extends IPerson { }

const Registration: FC = () => {

    const [formValues, setFormValues] = useState<FormValues>({
        role: 'role_student',
        username: '',
        password: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        courseId: '',
    });

    const router = useRouter();

    const validationSchema = Yup.object({
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
        password: Yup.string()
            .required('Пароль обязателен к заполнению')
            .matches(
                // /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                'Пароль должен содержать не менее 8 символов, включая как минимум одну заглавную букву, цифру и специальный символ, например: !@#$%^&*'
            ),
        lastName: Yup.string().required("Фамилия обязательна к заполнению"),
        firstName: Yup.string().required("Имя обязательно к заполнению"),
        patronymic: Yup.string().required("Отчество обязательно к заполнению"),
        courseId: Yup.string()
            .required("№ курса обязателен к заполнению")
            .matches(/^[1-4]$/, '№ курса должен быть в диапазоне от 1 до 4'),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
        setSubmitting(true);

        setTimeout(() => {
            //Преобразуем приходящий объект в строку JSON
            alert(JSON.stringify(values, null, 2));
            //Когда пользователь отправляет форму, Formik устанавливает значение isSubmitting в true, чтобы указать, 
            //что форма находится в процессе отправки. В это время пользователь не может отправить форму повторно. 
            //Как только процесс отправки завершен, значение isSubmitting должно быть сброшено обратно на false, 
            //чтобы пользователь мог отправить форму вновь.
            // setSubmitting(false);
        }, 400);

        try {
            const response = await axios.post('https://api.pfctngr.ru/register', values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            await router.push('/Authorization');

            return console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        setSubmitting(false);
    };

    return (
        <>
            <Head>
                <title>Testing App - Регистрация</title>
            </Head>
            <Formik
                //Определяем начальные значения полей формы
                initialValues={formValues}
                //Определяем схему валидаци формы
                validationSchema={validationSchema}
                //Определяем функцию обработки отправки формы
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    //isSubmitting - булевое значение, указывающее, отправляется ли форма в настоящее время
                    //errors - объект, содержащий ошибки валидации формы
                    //touched - объект, содержащий информацию о том, какие поля были касались пользователи
                    <main className={reg.main}>
                        <Form className={reg.regForm}>
                            <legend className={reg.regForm__title}>Регистрация</legend>
                            <fieldset className={reg.regForm__fieldset}>
                                <div className={reg.regForm__field}>

                                    <Field
                                        type="text"
                                        id="courseId"
                                        name="courseId"
                                        className={`
                                            ${reg.regForm__input} ${errors.courseId && touched.courseId ? reg.regForm__input_error : ""}
                                        `}
                                        placeholder="№ курса"
                                        title="Введите номер курса"
                                        inputMode="numeric"
                                        pattern="[1-4]*"
                                        maxLength={1}
                                    />
                                    <ErrorMessage
                                        name="courseId"
                                        component="span"
                                        className={reg.regForm__error}
                                    />
                                </div>

                                <div className={reg.regForm__field}>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        className={`
                                            ${reg.regForm__input} ${errors.username && touched.username ? reg.regForm__input_error : ""
                                            }`}
                                        placeholder="Email"
                                        title="Введите Email"
                                        maxLength={254}
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="span"
                                        className={reg.regForm__error}
                                    />
                                </div>

                                <div className={reg.regForm__field}>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className={`
                                            ${reg.regForm__input} ${errors.firstName && touched.firstName ? reg.regForm__input_error : ""}
                                            `}
                                        placeholder="Имя"
                                        title="Введите имя"
                                        maxLength={50}
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="span"
                                        className={reg.regForm__error}
                                    />
                                </div>

                                <div className={reg.regForm__field}>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className={`
                                            ${reg.regForm__input} ${errors.lastName && touched.lastName ? reg.regForm__input_error : ""}
                                            `}
                                        placeholder="Фамилия"
                                        title="Введите фамилию"
                                        maxLength={50}
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="span"
                                        className={reg.regForm__error}
                                    />
                                </div>

                                <div className={reg.regForm__field}>
                                    <Field
                                        type="text"
                                        id="patronymic"
                                        name="patronymic"
                                        className={`
                                            ${reg.regForm__input} ${errors.patronymic && touched.patronymic ? reg.regForm__input_error : ""}
                                            `}
                                        placeholder="Отчество"
                                        title="Введите отчество"
                                        maxLength={50}
                                    />
                                    <ErrorMessage
                                        name="patronymic"
                                        component="span"
                                        className={reg.regForm__error}
                                    />
                                </div>

                                <div className={reg.regForm__field}>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`
                                            ${reg.regForm__input} ${errors.password && touched.password ? reg.regForm__input_error : ""
                                            }`}
                                        placeholder="Пароль"
                                        title="Введите пароль"
                                        maxLength={128}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className={`${reg.regForm__error} ${reg.regForm__error_pass}`}
                                    />
                                </div>

                                <button type="submit" disabled={isSubmitting} className={reg.regForm__btn} title='Зарегистрировать аккаунт'>
                                    Зарегистрироваться
                                </button>

                                <nav className={reg.regForm__nav}>
                                    <span className={reg.regForm__linkText}>Уже есть учетная запись? </span>
                                    <Link href="/Authorization" className={reg.regForm__link} title='Перейти на страницу авторизации'>
                                        Войдите в свой аккаунт, чтобы продолжить
                                    </Link>
                                </nav>
                            </fieldset>
                        </Form>
                    </main>
                )}
            </Formik>
        </>
    );
};

export default Registration;