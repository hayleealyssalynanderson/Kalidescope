from nl4dv import NL4DV
import pandas as pd

import altair as alt
from altair_saver import save
from altair.utils.data import to_values

from fastapi.responses import FileResponse
from fastapi import FastAPI

from pydantic import BaseModel




global nl4dv_instance
global df
df = pd.read_csv('MOCK_DATA.csv')
nl4dv_instance = NL4DV(data_value = df)
dependency_parser_config = {"name": "spacy", "model": "en_core_web_sm", "parser": None}
nl4dv_instance.set_dependency_parser(config=dependency_parser_config)


# Define a query
"""
query = "open accounts each year"
query = "barchart of predicted loss"
query = "histogram of profit"
query = "account balance by open date"
query = "bar chart average deposit for each product type"
query = "current balance vs. average deposit"
query = "current balance vs. average deposit for each product type"
"""






app = FastAPI(title="NL4DV", description="Return a visualization corresponding to query", version=1.0)


class ModelParams(BaseModel):
    query: str


        


@app.post("/visualization")
def getVisualization(params: ModelParams):

    # Run the query  

    output = nl4dv_instance.analyze_query(params.query)
    
    #Save Chart as html
    output['visList'][0]['vlSpec']['data'] = to_values(df)

    chart = alt.Chart.from_dict(output['visList'][0]['vlSpec'])

    chart.save('chart.html')

    return FileResponse("chart.html")