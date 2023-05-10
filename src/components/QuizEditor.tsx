import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CForm, CFormGroup, CInput, CLabel, CButton } from '@coreui/react';

const QuizEditor = () => {
    const router = useRouter();
    const [quizTitle, setQuizTitle] = useState('');

    const handleCreateQuiz = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/quiz/${quizTitle}`);
    };

    return (
        <CForm onSubmit={handleCreateQuiz}>
            <CFormGroup>
                <CLabel htmlFor="quizTitle">Quiz Title</CLabel>
                <CInput
                    required
                    type="text"
                    id="quizTitle"
                    name="quizTitle"
                    placeholder="Enter quiz title..."
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </CFormGroup>

            <CButton color="primary" type="submit">
                Create Quiz
            </CButton>
        </CForm>
    );
};

export default QuizEditor;