//React components
import { FC, useState } from 'react';

//Formik components
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Types
import { IPerson } from '../api/auth/types';

//Validation
import * as Yup from 'yup';

//Styles and images
import reg from '../styles/Registration.module.css';

//Типизация setSubmitting
type SetSubmitting = (isSubmitting: boolean) => void;

//Типизация FormValues
interface FormValues extends IPerson { }

const Registration: FC = () => {
    const [registrationError, setRegistrationError] = useState('');
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        courseId: '',
    });

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
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                'Пароль должен содержать не менее 6 символов, включая как минимум одну заглавную букву и одну цифру'
            ),
        lastName: Yup.string().required("Фамилия обязательна к заполнению"),
        firstName: Yup.string().required("Имя обязательно к заполнению"),
        patronymic: Yup.string().required("Отчество обязательно к заполнению"),
        courseId: Yup.string()
            .required("№ курса обязателен к заполнению")
            .matches(/^[1-4]$/, '№ курса должен быть в диапазонеот 1 до 4'),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: SetSubmitting }) => {
        // try {
        //     const response = await fetch('/api/register', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(values),
        //     });

        //     if (response.ok) {
        //         console.log('Registration successful!');
        //     } else {
        //         setRegistrationError('Registration failed!');
        //     }
        // } catch (error) {
        //     console.error('Error registering user:', error);
        //     setRegistrationError('Error registering user');
        // } finally {
        //     setSubmitting(false);
        // }
        setTimeout(() => {
            //Преобразуем приходящий объект в строку JSON
            alert(JSON.stringify(values, null, 2));
            //Когда пользователь отправляет форму, Formik устанавливает значение isSubmitting в true, чтобы указать, 
            //что форма находится в процессе отправки. В это время пользователь не может отправить форму повторно. 
            //Как только процесс отправки завершен, значение isSubmitting должно быть сброшено обратно на false, 
            //чтобы пользователь мог отправить форму вновь.
            setSubmitting(false);
        }, 400);
    };

    return (
        <>
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

                            <button type="submit" disabled={isSubmitting} className={reg.regForm__btn} title='Зарегистрировать пользователя'>
                                Зарегистрироваться
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Formik>
            {registrationError && <p>{registrationError}</p>}
        </>
    );
};

export default Registration;