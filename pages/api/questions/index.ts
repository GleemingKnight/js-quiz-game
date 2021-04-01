import { NextApiRequest, NextApiResponse } from 'next'

const questions = [{
    id: 0,
    question: "What's the capital of Tennessee?",
    answers: ["A. Nashville", "B. Knoxville", "C. Memphis", "D. Houston"],
    correctAnswer: "A. Nashville"
},
{
    id: 1,
    question: "Who was the 45th president of the United States?",
    answers: ["A. Barrack Obama", "B. Joe Biden", "C. Donald Trump", "D. Joe Biden"],
    correctAnswer: "C. Donald Trump"
},
{
    id: 2,
    question: "Is Califorina in the western United States or the eastern United States?",
    answers: ["A. Eastern", "B. Western"],
    correctAnswer: "B. Western"
}]

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(questions)
}

export default handler