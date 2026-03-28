# ============================================
# AutoInsight Backend - FastAPI
# File: api/main.py
# ============================================

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Step 1: Create FastAPI app
app = FastAPI(title="AutoInsight")

# Step 2: Enable CORS so frontend can fetch
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # "*" sab allow karega
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Step 3: Load CSV once
df = pd.read_csv("data/cleaned_data.csv")
print("CSV loaded! Rows:", len(df))

# Step 4: /data endpoint
@app.get("/data")
def get_data():
    return df.to_dict(orient="records")

# Step 5: /summary endpoint
@app.get("/summary")
def get_summary():
    return {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "columns": list(df.columns)
    }