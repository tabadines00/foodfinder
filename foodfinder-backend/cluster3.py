from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity

# Assuming 'data' is your list of restaurant data objects
# For categorical features

mlb = MultiLabelBinarizer()
categories_matrix = mlb.fit_transform([restaurant['categories'] for restaurant in data])

# For text features, e.g., restaurant descriptions or reviews
tfidf = TfidfVectorizer(stop_words='english')
text_features = tfidf.fit_transform([restaurant['description'] for restaurant in data])


def create_user_profile(user_likes, feature_matrix):
    # user_likes is a list of indices of restaurants the user has liked
    # feature_matrix is the matrix obtained from feature extraction
    user_profile = np.mean(feature_matrix[user_likes], axis=0)
    return user_profile




def recommend_restaurants(user_profile, feature_matrix, data, top_n=10):
    # Calculate cosine similarity between user profile and all item profiles
    similarities = cosine_similarity(user_profile, feature_matrix)
    
    # Get the top_n items with the highest similarity scores
    # argsort returns indices of sorted items; [::-1] reverses to get descending order
    top_indices = similarities.argsort().flatten()[::-1][:top_n]
    
    # Fetch the corresponding items from the dataset
    recommendations = [data[index] for index in top_indices]
    
    return recommendations
