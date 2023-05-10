//React components
import { FC, useState } from "react";

//Next components
import Image from 'next/image';

//Redux
import { useAppDispatch } from "../store";
import { loginUser } from '@/store/auth/actionCreators';

//Formik components
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Types
import { ILoginRequest } from '../api/auth/types';

//Validation
import * as Yup from "yup";

//Styles and images
import auth from "../styles/Authorization.module.css";
import logo from "../img/logo.png";

type SetSubmitting = (isSubmitting: boolean) => void;

interface FormValues extends ILoginRequest {
    username: string;
    password: string;
}

//Схема валидации
const LoginSchema = Yup.object().shape({
    username: Yup.string().email("Некорректный email").required("Email обязателен").test({
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
    password: Yup.string().required("Пароль обязателен"),
});

const Authorization: FC = () => {
    //Хук для получения метода dispatch из ../store
    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: '',
    });

    const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
        setTimeout(() => {
            //Преобразуем приходящий объект в строку JSON
            alert(JSON.stringify(values, null, 2));
            //Когда пользователь отправляет форму, Formik устанавливает значение isSubmitting в true, чтобы указать, 
            //что форма находится в процессе отправки. В это время пользователь не может отправить форму повторно. 
            //Как только процесс отправки завершен, значение isSubmitting должно быть сброшено обратно на false, 
            //чтобы пользователь мог отправить форму вновь.
            setSubmitting(false);
        }, 400);

        dispatch(loginUser(values));
    };

    return (
        <>
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
                )}
            </Formik >
        </>
    )
}

export default Authorization;