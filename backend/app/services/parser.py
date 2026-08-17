import re


SKILLS = [
    # Programming
    "Python",
    "Java",
    "C++",
    "C",
    "C#",
    "JavaScript",
    "TypeScript",

    # Web / Backend
    "FastAPI",
    "Django",
    "Flask",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "REST API",

    # AI / ML
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Data Analysis",
    "Natural Language Processing",
    "NLP",
    "Computer Vision",
    "Generative AI",

    # ML Libraries
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",
    "Pandas",
    "NumPy",
    "OpenCV",

    # Databases
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",

    # Tools / DevOps
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "Linux",

    # Cloud
    "AWS",
    "Microsoft Azure",
    "Azure",
    "Google Cloud",

    # Analytics
    "Power BI",
    "Tableau",
    "Excel",
]


def extract_skills(text: str) -> list[str]:
    """
    Extract known technical skills from text.

    Matching is case-insensitive and uses word boundaries
    to avoid partial skill matches.
    """

    if not text:
        return []

    return [
        skill
        for skill in SKILLS
        if re.search(
            rf"(?<!\w){re.escape(skill)}(?!\w)",
            text,
            re.IGNORECASE,
        )
    ]


def extract_resume_info(text: str) -> dict:
    """
    Extract email, phone number, and skills from resume text.
    """

    if not text:
        return {
            "email": [],
            "phone": [],
            "skills": [],
        }

    return {
        "email": re.findall(
            r"[\w.+-]+@[\w.-]+\.\w+",
            text,
        ),
        "phone": re.findall(
            r"\+?\d[\d\s-]{8,15}\d",
            text,
        ),
        "skills": extract_skills(text),
    }


def extract_job_info(text: str) -> dict:
    """
    Extract required skills from job description text.
    """

    return {
        "skills": extract_skills(text),
    }