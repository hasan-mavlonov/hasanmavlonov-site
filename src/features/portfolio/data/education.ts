import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "ecust",
    school: "ECUST",
    degree: "B.Sc.",
    fieldOfStudy: "Artificial Intelligence",
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
  },
]
