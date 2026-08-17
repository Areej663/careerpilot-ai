def normalize_skill(skill: str) -> str:
    """
    Normalize skill names so equivalent skills
    can be matched correctly.
    """

    skill = skill.strip().casefold()

    aliases = {
        "microsoft azure": "azure",
        "azure cloud": "azure",

        "natural language processing": "nlp",

        "scikit learn": "scikit-learn",
        "scikit learn library": "scikit-learn",

        "machine-learning": "machine learning",
        "deep-learning": "deep learning",

        "artificial-intelligence": "artificial intelligence",

        "javascript": "javascript",
        "js": "javascript",

        "typescript": "typescript",
        "ts": "typescript",

        "reactjs": "react",
        "react.js": "react",

        "node": "node.js",
        "nodejs": "node.js",

        "postgres": "postgresql",

        "powerbi": "power bi",

        "github": "github",
    }

    return aliases.get(skill, skill)


def calculate_match(
    resume_data: dict,
    job_data: dict,
) -> dict:
    """
    Calculate resume-to-job skill match percentage.
    """

    resume_skills = resume_data.get("skills", [])
    job_skills = job_data.get("skills", [])

    # Create normalized lookup for resume skills
    resume_lookup = {}

    for skill in resume_skills:
        normalized = normalize_skill(skill)

        if normalized:
            resume_lookup[normalized] = skill

    # Create normalized lookup for job skills
    job_lookup = {}

    for skill in job_skills:
        normalized = normalize_skill(skill)

        if normalized:
            job_lookup[normalized] = skill

    # No job skills found
    if not job_lookup:
        return {
            "match_score": 0.0,
            "matched_skills": [],
            "missing_skills": [],
        }

    # Find matching and missing skills
    matched_keys = set(resume_lookup) & set(job_lookup)
    missing_keys = set(job_lookup) - set(resume_lookup)

    # Calculate percentage
    match_score = round(
        len(matched_keys) / len(job_lookup) * 100,
        2,
    )

    return {
        "match_score": match_score,

        "matched_skills": sorted(
            job_lookup[key]
            for key in matched_keys
        ),

        "missing_skills": sorted(
            job_lookup[key]
            for key in missing_keys
        ),
    }