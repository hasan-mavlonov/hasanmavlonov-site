import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "ecust",
    school: "East China University of Science and Technology",
    degree: "Bachelor of Science",
    fieldOfStudy: "Artificial Intelligence",
    period: {
      start: "09.2025",
      end: "07.2028",
    },
    description: `- Studying for a B.Sc. in Artificial Intelligence in Shanghai, China.
- Class Leader, AI major, class of 2028.
- Developed and presented an AI-powered student profile platform to Ren Youqun, Vice Minister of the Ministry of Education of China.
- Focus areas: machine learning, deep learning, algorithms, computer vision and NLP.`,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Algorithms",
      "Computer Vision",
      "NLP",
      "Python",
    ],
    isExpanded: true,
  },
  {
    id: "cambridge",
    school: "University of Cambridge",
    fieldOfStudy: "Machine Learning and Neural Networks",
    period: {
      start: "11.2025",
      end: "12.2025",
    },
    description: `- Built an EfficientNetB0-based CNN for binary classification of breast cancer histopathology images (BreaKHis 400x), achieving robust feature extraction on high-resolution medical data.`,
    skills: ["Python", "TensorFlow", "EfficientNet", "SHAP", "Medical Imaging"],
  },
]
