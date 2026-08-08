import re


def extract_resume_info(text: str):
    # Email
    email = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)

    # Phone Number
    phone = re.findall(r'(\+?\d[\d\s\-]{8,15})', text)

    # Skills List
    skills_db = [
        "Python",
        "Java",
        "C++",
        "FastAPI",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "Git",
        "Docker",
        "TensorFlow",
        "PyTorch",
        "JavaScript",
        "React",
        "HTML",
        "CSS"
    ]

    found_skills = []

    for skill in skills_db:
        if re.search(rf"\b{re.escape(skill)}\b", text, re.IGNORECASE):
            found_skills.append(skill)
    return {
        "email": email,
        "phone": phone,
        "skills": found_skills
    }