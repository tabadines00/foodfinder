import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Your data (for multiple restaurants, this should be a list of dicts)
data = {
  "businesses": [
    # ... your businesses data ...
  ],
  "region": {
    "center": {
      "latitude": 37.76089938976322,
      "longitude": -122.43644714355469
    }
  },
  "total": 6800
}

# Extract relevant features and transform the data into a DataFrame for easier manipulation
def extract_features(businesses):
    features = []
    for b in businesses:
        # Basic numerical features
        features.append({
            'latitude': b['coordinates']['latitude'],
            'longitude': b['coordinates']['longitude'],
            'rating': b['rating'],
            'review_count': b['review_count'],
            'price': len(b['price']) if 'price' in b else 0,  # Convert $ to numerical
        })
        #!!!
        # One-hot encoding for categories (this is a simple way, you might want to refine it) 
        for category in b['categories']:
            features[-1][f"category_{category['alias']}"] = 1
    return pd.DataFrame(features).fillna(0)  # Fill NaN with 0 (for categories not present)
        #!!!

df = extract_features(data['businesses'])

# Normalize the features (important for k-means)
scaler = StandardScaler()
df_normalized = scaler.fit_transform(df) 


# Assuming you've determined the number of clusters (k) beforehand
k = 5  # for example, but you should use methods like the Elbow method to choose k

kmeans = KMeans(n_clusters=k, random_state=42)
kmeans.fit(df_normalized)

# The cluster labels for each point
labels = kmeans.labels_



# Add the cluster labels to your original DataFrame
df['cluster'] = labels

# Example: To find recommendations similar to a specific restaurant
target_restaurant_idx = 0  # Index of the target restaurant in df
target_cluster = df.iloc[target_restaurant_idx]['cluster']



def get_recommendations(df, target_restaurant_idx, num_recommendations=5):
    """
    Get recommendations for restaurants similar to the target restaurant.
    
    :param df: DataFrame containing the restaurant data and cluster labels.
    :param target_restaurant_idx: Index of the target restaurant in df.
    :param num_recommendations: Number of similar restaurants to recommend.
    :return: DataFrame containing the recommended similar restaurants.
    """
    target_cluster = df.iloc[target_restaurant_idx]['cluster']
    # Filter restaurants in the same cluster and exclude the target restaurant
    recommendations = df[(df['cluster'] == target_cluster) & (df.index != target_restaurant_idx)]
    
    # Sort the recommendations - here, we sort by review_count just as an example
    # You might want to use other or additional criteria like distance, rating, etc.
    top_recommendations = recommendations.nlargest(num_recommendations, 'review_count')
    return top_recommendations

# Filter restaurants in the same cluster
recommended_restaurants = df[df['cluster'] == target_cluster]

#!!!
"""
# Example usage:
num_recommendations = 5
target_restaurant_idx = 0  # Index of the target restaurant in df
recommended_restaurants = get_recommendations(df, target_restaurant_idx, num_recommendations)
print(recommended_restaurants) 

""" 
#!!!