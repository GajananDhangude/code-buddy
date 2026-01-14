from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel , Field


load_dotenv()

llm = ChatGroq(model ="openai/gpt-oss-120b")
from prompts import *
from states import *

user_prompt = "create a simple calculator web application"
prompt = planner_prompt(user_prompt)



res = llm.with_structured_output(Plan).invoke(prompt)
print(res)