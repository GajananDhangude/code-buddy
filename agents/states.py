from pydantic import BaseModel , Field

class File(BaseModel):
    path:str = Field(description="The file path where the file will be created.")
    purpose:str = Field(description="A brief description of the purpose of the file. e.g 'main application logic' , 'data processing module' , etc")

class Plan(BaseModel):
    name: str = Field(description="The name of the project")
    description: str = Field(description="A one-line description of the app to built. ")
    techstack: str = Field(description="The technologies to be used to build the app. e.g., React, Node.js, etc.")
    features: list[str] = Field(description="A list of features to be implemented in the app.")
    files: list[File] = Field(description="A list of files to be created for the project. each with a path and purpose")