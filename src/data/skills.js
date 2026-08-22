/**
 * Levels are self-assessed on the same scale used on the BDjobs profile.
 * 90+ means I reach for it without thinking. 60 means I have shipped with it
 * and would need to look things up.
 */

export const skillGroups = [
  {
    id: 'lang',
    label: 'Languages',
    note: 'what I write in',
    items: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 78 },
      { name: 'TypeScript / JavaScript', level: 72 },
      { name: 'C / C++', level: 70 },
      { name: 'C#', level: 65 },
    ],
  },
  {
    id: 'ml',
    label: 'ML and data',
    note: 'the day job',
    items: [
      { name: 'pandas / NumPy / Polars', level: 94 },
      { name: 'scikit-learn', level: 90 },
      { name: 'LightGBM / XGBoost / CatBoost', level: 88 },
      { name: 'PyTorch', level: 84 },
      { name: 'Optuna / SHAP', level: 82 },
      { name: 'Survival analysis', level: 74 },
    ],
  },
  {
    id: 'cv',
    label: 'Computer vision',
    note: 'detectors and trackers',
    items: [
      { name: 'YOLO11 / YOLO26 · Ultralytics', level: 90 },
      { name: 'OpenCV', level: 84 },
      { name: 'ByteTrack', level: 80 },
      { name: 'Vision Transformers', level: 74 },
      { name: 'Kolmogorov-Arnold Networks', level: 70 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend and web',
    note: 'so the model can be called',
    items: [
      { name: 'Django / Django REST', level: 86 },
      { name: 'REST API design', level: 84 },
      { name: 'FastAPI / SQLAlchemy', level: 78 },
      { name: 'PostgreSQL / MySQL', level: 76 },
      { name: 'React / Next.js', level: 68 },
    ],
  },
  {
    id: 'tools',
    label: 'Tooling',
    note: 'everything around it',
    items: [
      { name: 'Git and GitHub', level: 84 },
      { name: 'Jupyter / Kaggle', level: 92 },
      { name: 'Docker', level: 70 },
      { name: 'Linux / shell', level: 72 },
      { name: 'Cisco Packet Tracer', level: 66 },
    ],
  },
]

export const competencies = [
  'Machine learning and deep learning',
  'Computer vision',
  'Feature engineering and data analysis',
  'REST API and system design',
  'Model evaluation and tuning',
  'Full-stack web development',
]

export const softSkills = [
  'Team leadership',
  'Presentation and public speaking',
  'English communication',
  'Project and time management',
  'Problem solving',
  'Adaptability',
]

export default skillGroups
