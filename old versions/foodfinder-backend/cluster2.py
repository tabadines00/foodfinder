import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.metrics import silhouette_score
import joblib

# Example list of restaurant data objects
data = [
    {
        "id": "40jwV3yIumMsi0ahiIxKDA",
        "name": "Dave Johnson Golf Experience",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ntBqR7tVtHe-ghlEHP0Z0g/o.jpg",
        "categories": [
            "Golf",
            "Golf Lessons"
        ],
        "rating": 4.5
    },
    # ... add more restaurant data objects
]

# Data Preparation
categories = [restaurant['categories'] for restaurant in data]
ratings = [restaurant['rating'] for restaurant in data]

# Feature Encoding
mlb = MultiLabelBinarizer()
categories_encoded = mlb.fit_transform(categories)

# Feature Normalization
scaler = MinMaxScaler()
ratings_scaled = scaler.fit_transform(np.array(ratings).reshape(-1, 1))

# Combining all features
features = np.hstack((categories_encoded, ratings_scaled))

silhouette_scores = []
K_range = range(2, 11)  # Example range, adjust based on your dataset

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=0)
    kmeans.fit(features)
    cluster_labels = kmeans.labels_
    silhouette_scores.append(silhouette_score(features, cluster_labels))

best_k = K_range[np.argmax(silhouette_scores)]
print(f'Best number of clusters (k) based on silhouette score: {best_k}')

# Train the model with the best k
kmeans = KMeans(n_clusters=best_k, random_state=0)
kmeans.fit(features)

# Save the model
joblib.dump(kmeans, 'kmeans_model.pkl')

# Optionally, load the model
# kmeans = joblib.load('kmeans_model.pkl')

# Assigning cluster labels to your data
cluster_labels = kmeans.labels_

# Add cluster labels to your data objects
for i, restaurant in enumerate(data):
    restaurant['cluster'] = int(cluster_labels[i])

# Analyze cluster characteristics
for i in range(best_k):
    cluster_members = [restaurant for restaurant in data if restaurant['cluster'] == i]
    print(f"Cluster {i}:")
    print(f"Members: {len(cluster_members)}")
    # Add more detailed analysis as needed

# Now you can use the cluster labels to recommend similar restaurants within the same cluster