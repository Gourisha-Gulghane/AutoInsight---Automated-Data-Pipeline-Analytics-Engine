import pandas as pd

print("Script is running...")

# Load data
df = pd.read_csv("data/customers-100.csv")

print("Data loaded!")
print("Shape:", df.shape)

# Missing values
print("\nMissing values:")
print(df.isnull().sum())

for col in df.columns:
    if df[col].dtype == "object":
        df[col] = df[col].fillna("Unknown")
    else:
        # only apply mean if column is numeric
        if pd.api.types.is_numeric_dtype(df[col]):
            df[col] = df[col].fillna(df[col].mean())

print("Missing values handled!")

# Remove duplicates
before = len(df)
df.drop_duplicates(inplace=True)
after = len(df)

print(f"Removed {before - after} duplicate rows")

# Save cleaned file
df.to_csv("data/cleaned_data.csv", index=False)

print("Cleaned file saved!")