class Question:
    def __init__(self, question, right_ans, wrong_ans):
        self.question = question
        self.right_answer = right_ans
        self.wrong_answer = wrong_ans

class Quest:
    def __init__(self):
        self.total_questions = 5
        self.questions = [Question() for i in range(3)]
        
    def get_questions(self):
        return self.questions[0], self.questions[1], self.get_questions[2]
    
    def check_answer(self, answer:Question, *questions:Question):
        for q in questions:
            if q.question == answer:
                if q.right_answer == True:
                    return "Right answer!"
        return "Wrong answer!"