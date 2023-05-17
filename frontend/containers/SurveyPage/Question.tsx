import React, { useState, useEffect } from 'react';
import api from '@/apis/config';
import QuestionGauge from './QuestionGauge';
import QuestionPage1 from './QuestionPage1';
import QuestionPage2 from './QuestionPage2';
import QuestionPage3 from './QuestionPage3';
import QuestionPage4 from './QuestionPage4';
import QuestionPage5 from './QuestionPage5';
import QuestionPage6 from './QuestionPage6';

const Question = () => {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<String[]>([]);
  const [male, setMale] = useState(false);

  useEffect(() => {
    const storedQuestionList = localStorage.getItem('questionList');
    if (storedQuestionList) {
      setQuestionList(JSON.parse(storedQuestionList));
    } else {
      api
        .getSurvey()
        .then((res) => {
          setQuestionList(res.data.questionList);
          localStorage.setItem(
            'questionList',
            JSON.stringify(res.data.questionList),
          );
        })
        .catch((error) => {
          console.error('Error fetching survey questions:', error);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers, male, currentPage]);

  const handleNextPage = () => {
    // 성별이 남자일 때 3번 질문일 경우 다음 페이지로 이동
    if (currentPage === 2 && answers[2] === 'male') {
      setMale(true);
      answers[3] = false;
      setCurrentPage((prevPage) => prevPage + 2);
    } else if (answers[2] !== 'male') {
      setMale(false);
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (currentPage !== 2 && answers[2] === 'male') {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    // 성별이 남자일 때 3번 질문일 경우 다음 페이지로 이동
    if (currentPage === 4 && answers[2] === 'male') {
      setCurrentPage((prevPage) => prevPage - 2);
    } else {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentPage]: answer,
    }));
  };

  const handleSubmit = () => {
    // 문제 번호에 맞는 문제 키워드로 바꿔주기
    const formattedAnswers = {
      age: answers[1], // 나이에 대한 답변
      gender: answers[2], // 성별에 대한 답변
      pregnant: answers[3] === 'Yes' ? true : false, // 임신 여부에 대한 답변
      takingNutrientList: [answers[4]], // 복용 중인 영양제에 대한 답변 (하나의 영양제만 선택 가능)
      functionList: answers[5].split(','), // 복용 목적에 대한 답변 (여러 개 선택 가능)
      typeList: answers[6].split(','), // 선호 제형에 대한 답변 (여러 개 선택 가능)
    };
    console.log('-->', answers, formattedAnswers);

    // 서버로 모든 답변 전송
    api
      .submitAnswers(formattedAnswers)
      .then((response) => {
        console.log('Answers submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting answers:', error);
      });
  };

  return (
    <div>
      <QuestionGauge
        currentQuestionIndex={currentPage - 1}
        male={male}
      />
      {currentPage === 1 && (
        <QuestionPage1
          question={questionList[0]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onNextPage={handleNextPage}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
      {currentPage === 2 && (
        <QuestionPage2
          question={questionList[1]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
      {male === false && currentPage === 3 && (
        <QuestionPage3
          question={questionList[2]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
      {currentPage === 4 && (
        <QuestionPage4
          question={questionList[3]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
      {currentPage === 5 && (
        <QuestionPage5
          question={questionList[4]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
      {currentPage === 6 && (
        <QuestionPage6
          question={questionList[5]}
          currentQuestionIndex={currentPage} // currentQuestionIndex 전달
          onPreviousPage={handlePreviousPage}
          onSubmit={handleSubmit}
          onAnswer={handleAnswer}
          answers={answers} // answers 상태 전달
        />
      )}
    </div>
  );
};

export default Question;
