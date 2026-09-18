import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load dataset
data = pd.read_csv("landslide_data.csv")

# Input features
X = data[
    [
        "rainfall",
        "soil_moisture",
        "slope",
        "elevation",
        "ground_movement"
    ]
]

# Target
y = data["risk"]

# Split data into training and testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

# Create Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train the model
model.fit(X_train, y_train)

# Test the model
accuracy = model.score(X_test, y_test)

print("Model trained successfully!")
print("Accuracy:", accuracy)



