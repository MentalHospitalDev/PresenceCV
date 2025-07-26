from services.resume_generator import resume_generator

sample_user_data = {
    "github": {
        "name": "John Doe",
        "login": "johndoe",
        "email": "john.doe@example.com",
        "bio": "Full-stack developer passionate about building scalable web applications",
        "location": "San Francisco, CA",
        "public_repos": 25,
        "followers": 150,
        "repositories": [
            {
                "name": "awesome-todo-app",
                "description": "A modern todo application built with React and Node.js",
                "language": "JavaScript",
                "topics": ["react", "nodejs", "mongodb"]
            },
            {
                "name": "ml-price-predictor",
                "description": "Machine learning model for predicting house prices",
                "language": "Python",
                "topics": ["machine-learning", "python", "scikit-learn"]
            }
        ]
    },
    "twitter": {
        "name": "John Doe",
        "username": "johndoe_dev",
        "bio": "Software Engineer | React Enthusiast | Coffee Lover",
        "location": "San Francisco, CA",
        "followers_count": 500
    },
    "additional_info": {
        "skills": ["JavaScript", "Python", "React", "Node.js", "MongoDB", "Git"],
        "experience": [
            {
                "title": "Senior Software Engineer",
                "company": "TechCorp Inc.",
                "duration": "2021-Present",
                "description": "Lead frontend development for e-commerce platform"
            }
        ],
        "education": [
            {
                "degree": "B.S. Computer Science",
                "institution": "University of California",
                "year": "2019"
            }
        ]
    }
}

print("Generating resume from sample data")
resume = resume_generator(sample_user_data)