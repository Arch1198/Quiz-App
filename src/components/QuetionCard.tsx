import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { AnswerObject } from "../App";

interface QuetionCardProps {
  quetion: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>)=> void
  userAnswer: AnswerObject | undefined;
  quetionNr: number;
  totalQuetions: number;
}

const QuetionCard: React.FC<QuetionCardProps> = ({
  quetion,
  answers,
  callback,
  userAnswer,
  quetionNr,
  totalQuetions,
}) => 
{
    console.log("answers", answers);
  return (
    <>
      <p style={{ color: "red" }}>
        Quetion:{quetionNr}/{totalQuetions}
      </p>
      <p
        style={{ color: "blue" }}
        dangerouslySetInnerHTML={{ __html: quetion }}
      />
      <div style={{ backgroundColor: "green" }}>
        {answers?.map((answer) => (
          <div key={answer}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>{" "}
          </div>
        ))}
      </div>
    </>
  );
}

export default QuetionCard;
