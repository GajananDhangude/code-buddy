def planner_prompt(user_prompt:str) -> str:
    PLANNER_PROMPT = f"""
You are the Planner agent. convert the user prompt into a COMPLETE engineering project plan

user request: {user_prompt}
"""
    
    return PLANNER_PROMPT