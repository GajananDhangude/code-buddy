from dotenv import load_dotenv
from langchain_core.globals import set_debug , set_verbose
from langchain_groq.chat_models import ChatGroq
from langgraph.constants import END
from langgraph.graph import StateGraph
from langgraph.prebuilt import create_react_agent

# from agents.prompts import *
# from agents.states import *
# from agents.tools import write_file, read_file, get_current_directory, list_files

load_dotenv()

set_debug(True)
set_verbose(True)

llm = ChatGroq(model="openai/gpt-oss-120b")

from agents.nodes import *


graph = StateGraph(dict)

graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_node("coder", coder_agent)

graph.add_edge("planner", "architect")
graph.add_edge("architect", "coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder": "coder"}
)

graph.set_entry_point("planner")
agent = graph.compile()


if __name__ == "__main__":
    result = agent.invoke({"user_prompt": "Create a buitiful landing page for smart agriculture monitoring system in react.js"},
                          {"recursion_limit": 100})
    print("Final State:", result)