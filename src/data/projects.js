/**
 * Every project here is real, shipped, and linked to its repository.
 * `metrics` are the numbers that were actually measured, not estimates.
 */

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine learning' },
  { id: 'cv', label: 'Computer vision' },
  { id: 'nlp', label: 'NLP' },
  { id: 'backend', label: 'Backend' },
  { id: 'research', label: 'Research' },
]

export const projects = [
  {
    id: 'churn-survival',
    idx: '01',
    title: 'Churn, and when',
    subtitle: 'Customer churn and survival prediction',
    org: 'bKash NSUCEC Cybernauts Datathon 2026',
    award: '1st Runner-Up',
    role: 'Team lead',
    year: '2026',
    tags: ['ml'],
    accent: 'amber',
    featured: true,
    stack: ['Python', 'Polars', 'LightGBM', 'XGBoost', 'CatBoost', 'Optuna', 'SHAP', 'scikit-survival'],
    summary:
      'Most churn models answer whether a customer leaves. The organisers wanted to know when, so the second half of this became a survival problem.',
    detail: [
      'Two hundred million transactions do not fit in memory, so the whole pipeline runs out-of-core on Polars lazy scans. From that I engineered 152 behavioural features covering recency, cadence, balance drift and counterparty spread.',
      'The classification model is a 5-fold LightGBM, XGBoost and CatBoost ensemble tuned with Optuna, landing at 0.985 ROC-AUC on cross-validation with SHAP used to keep the feature set honest.',
      'For the finale I extended it to time-to-event: an isotonic-calibrated survival model with a monotone constraint, reaching a 0.765 concordance index and an Integrated Brier Score of 0.0132. The top decile carried 3.3 times the base churn rate, which is the number the business people actually cared about.',
    ],
    metrics: [
      { key: 'ROC-AUC', val: '0.985' },
      { key: 'C-index', val: '0.765' },
      { key: 'IBS', val: '0.0132' },
      { key: 'Top-decile lift', val: '3.3x' },
    ],
    links: [
      { label: 'Survival model', url: 'https://github.com/arifshekhk8/nsucec-cybernauts-2026-churn-survival' },
      { label: 'Competition pipeline', url: 'https://github.com/arifshekhk8/bkash-nsucec-churn-competition' },
    ],
  },

  {
    id: 'roadvision',
    idx: '02',
    title: 'RoadVision',
    subtitle: 'Vehicle detection on Bangladeshi highway CCTV',
    org: 'DUET CSE Carnival 2026 AI Hackathon',
    award: '1st Runner-Up',
    role: 'Team lead, Team Straw Hat',
    year: '2026',
    tags: ['cv', 'ml'],
    accent: 'signal',
    featured: true,
    stack: ['Python', 'YOLO11l', 'YOLO11x', 'YOLOv12-X', 'RF-DETR', 'Weighted Box Fusion', 'TTA', 'Ultralytics'],
    summary:
      'Thirteen vehicle classes native to Bangladeshi roads, filmed from highway CCTV. CNGs, easy-bikes and rickshaw vans do not appear in any pretrained checkpoint, and half of them are twenty pixels tall.',
    detail: [
      'The dataset is badly imbalanced and the objects are small, so I fine-tuned two detectors at 1280px rather than one at 640: YOLO11l and YOLO11x, both with mosaic, mixup and copy-paste augmentation to force the rare classes to show up more often.',
      'Predictions from both models were merged with Weighted Box Fusion on top of multi-scale test-time augmentation. Fusion is what moved the needle. Either model alone sat noticeably lower.',
      'Final private-leaderboard mAP@0.5 was 0.656 against 0.867 on validation, second nationally.',
    ],
    metrics: [
      { key: 'mAP@0.5 private', val: '0.656' },
      { key: 'mAP@0.5 val', val: '0.867' },
      { key: 'Classes', val: '13' },
      { key: 'National rank', val: '#2' },
    ],
    links: [
      { label: 'Train and inference', url: 'https://github.com/arifshekhk8/RoadVision-DUET-Train-Infer' },
      { label: 'Hackathon repo', url: 'https://github.com/arifshekhk8/RoadVision-DUET-AI-Hackathon' },
    ],
  },

  {
    id: 'pedestrian-intent',
    idx: '03',
    title: 'Will they cross?',
    subtitle: 'Pedestrian crossing-intention prediction',
    org: 'Undergraduate thesis, first-author journal paper in preparation',
    award: 'First author',
    role: 'Sole author',
    year: '2026',
    tags: ['cv', 'research', 'ml'],
    accent: 'signal',
    featured: true,
    stack: ['Python', 'PyTorch', 'BiLSTM', 'YOLO26', 'ByteTrack', 'PIE dataset'],
    summary:
      'A two-stream BiLSTM that reads a pedestrian bounding-box track plus the ego vehicle speed and predicts whether that person is about to step into the road.',
    detail: [
      'Much of the published work on PIE leaks: clips from the same scene end up in both train and test, and the reported numbers quietly inflate. I rebuilt the split so that cannot happen, then measured again.',
      'Under the leakage-free protocol the model reaches 0.932 ROC-AUC and 0.883 accuracy at 0.575 milliseconds per window, which puts it level with multimodal networks many times its size.',
      'It runs live too. YOLO26 detects, ByteTrack maintains identity, and the BiLSTM paints an intent overlay on each track. The manuscript is targeted at a journal for late 2026.',
    ],
    metrics: [
      { key: 'ROC-AUC', val: '0.932' },
      { key: 'Accuracy', val: '0.883' },
      { key: 'Latency', val: '0.575 ms' },
      { key: 'Protocol', val: 'leak-free' },
    ],
    links: [
      { label: 'Repository', url: 'https://github.com/arifshekhk8/pedestrian-crossing-intention-pie' },
      { label: 'Thesis notes', url: 'https://github.com/arifshekhk8/pedestrian-vehicle-behavior-prediction' },
    ],
  },

  {
    id: 'medkan',
    idx: '04',
    title: 'MedKAN',
    subtitle: 'Kolmogorov-Arnold Networks for brain-tumour MRI',
    org: 'Paper submitted to SPICSCON 2026',
    award: 'First author',
    role: 'First author',
    year: '2026',
    tags: ['research', 'cv', 'ml'],
    accent: 'amber',
    featured: true,
    stack: ['Python', 'PyTorch', 'Kolmogorov-Arnold Networks', 'timm', 'Vision Transformers'],
    summary:
      'MedKAN-B swaps the fixed activations of a standard network for learnable spline edges, then gets benchmarked against CNN and ViT baselines on four-class brain-tumour MRI.',
    detail: [
      'The interesting question was not peak accuracy, it was what happens when the data runs out. Medical datasets usually do.',
      'So every architecture was retrained on 100, 50 and 25 percent of the training set. KAN layers hold their ground further down that curve than the transformer baselines, which is the argument the paper makes.',
      'Submitted to SPICSCON 2026 as first author.',
    ],
    metrics: [
      { key: 'Classes', val: '4' },
      { key: 'Data fractions', val: '100/50/25%' },
      { key: 'Baselines', val: 'CNN + ViT' },
      { key: 'Venue', val: 'SPICSCON' },
    ],
    links: [{ label: 'Repository', url: 'https://github.com/arifshekhk8/MedKAN-SPICSCON2026' }],
  },

  {
    id: 'cowork',
    idx: '05',
    title: 'CoWork API',
    subtitle: 'Multi-tenant coworking-space booking service',
    org: 'IUT ICT Fest 2026 Hackathon, Team Straw Hat',
    role: 'Backend engineer',
    year: '2026',
    tags: ['backend'],
    accent: 'signal',
    featured: true,
    stack: ['Python 3.11', 'FastAPI', 'SQLAlchemy', 'JWT', 'Pydantic', 'Docker', 'pytest'],
    summary:
      'A booking API judged against a fixed contract, which means the spec is the referee and you do not get to argue with it.',
    detail: [
      'JWT auth with access and refresh rotation, role separation between admin and member, dynamic pricing, and a tiered refund policy that depends on how close to the slot you cancel.',
      'Tenant isolation was the part worth getting right. Two organisations sharing one database must never see each other, and concurrent bookings on the same room must not both succeed.',
      'Forty-five behavioural tests pass identically on a local run and inside Docker.',
    ],
    metrics: [
      { key: 'Tests passing', val: '45' },
      { key: 'Auth', val: 'JWT + refresh' },
      { key: 'Deploy', val: 'Docker' },
      { key: 'Contract', val: 'strict' },
    ],
    links: [{ label: 'Repository', url: 'https://github.com/arifshekhk8/StrawHat_ICT_Fest_Hackathon_Preliminary' }],
  },

  {
    id: 'dry-run',
    idx: '06',
    title: 'Dry Run',
    subtitle: 'Browser-based robotic-arm control suite',
    org: 'Techathon 2026, IUT Robotics Society',
    award: 'Finalist',
    role: 'Team Straw Hat',
    year: '2026',
    tags: ['backend'],
    accent: 'signal',
    featured: true,
    stack: ['TypeScript', 'React', 'Zod', 'Zustand', 'three.js', 'Groq LLM', 'Vitest'],
    summary:
      'Five input methods drive one robotic arm: dashboard, keyboard, joystick, voice, and an LLM planner. All five are funnelled through a single typed validate() gate before anything moves.',
    detail: [
      'Safety-critical control gets ugly fast when each input path does its own checking. One gate means one place to audit, and an LLM that hallucinates a joint angle gets rejected by the same code that rejects a bad joystick reading.',
      'State lives in Zustand, every command is parsed by Zod at the boundary, and the arm is rendered in three.js so you can watch a rejected command not happen.',
      'Sixty-two unit tests, and the architecture was documented well enough that the judges could follow the SOLID argument without reading the source.',
    ],
    metrics: [
      { key: 'Unit tests', val: '62' },
      { key: 'Input paths', val: '5' },
      { key: 'Validation gates', val: '1' },
      { key: 'Type safety', val: 'strict' },
    ],
    links: [
      { label: 'Final build', url: 'https://github.com/arifshekhk8/Techathon2026-Straw_Hat-Final' },
      { label: 'Prototype', url: 'https://github.com/arifshekhk8/Techathon2026-Straw_Hat' },
    ],
  },

  {
    id: 'olikbochon',
    idx: '07',
    title: 'অলীকবচন',
    subtitle: 'Bengali LLM hallucination detection',
    org: 'IUT ICT Fest 2026 Datathon, Team sudo_rm_-rf',
    award: 'Private LB rank 14',
    role: 'Team member',
    year: '2026',
    tags: ['nlp', 'ml'],
    accent: 'amber',
    featured: false,
    stack: ['Python', 'Transformers', 'NLP', 'Kaggle'],
    summary:
      'Binary faithfulness classification on Bengali prompt and response pairs, with a hard constraint: no hosted LLM APIs, everything runs offline inside a Kaggle notebook.',
    detail: [
      'The constraint is the whole problem. You cannot call a big model to judge the small one, so the detector has to carry its own understanding of Bengali.',
      'Twenty days, fully reproducible offline inference, private leaderboard rank 14.',
    ],
    metrics: [
      { key: 'Private LB', val: '#14' },
      { key: 'Language', val: 'Bengali' },
      { key: 'Runtime', val: 'offline' },
      { key: 'Window', val: '20 days' },
    ],
    links: [{ label: 'Repository', url: 'https://github.com/arifshekhk8/sudo_rm_-rf-olikbochon-bengali-hallucination' }],
  },

  {
    id: 'aamal',
    idx: '08',
    title: 'Aamal Foods',
    subtitle: 'Full-stack e-commerce platform',
    org: 'Independent build',
    role: 'Solo developer',
    year: '2026',
    tags: ['backend'],
    accent: 'signal',
    featured: false,
    stack: ['Django', 'Python', 'Bootstrap', 'JavaScript', 'Stripe', 'SSLCommerz'],
    summary:
      'A working storefront across seven product categories, plus the admin side that most portfolio e-commerce projects quietly skip.',
    detail: [
      'Customer side: catalogue, cart, wishlist, order tracking and authenticated profiles.',
      'Admin side: a custom dashboard of more than fifty endpoints covering sales analytics, inventory with expiry tracking, delivery and invoicing, and staff management.',
      'Two payment gateways are wired in, Stripe for cards and SSLCommerz for local Bangladeshi methods, because one of them is useless here without the other.',
    ],
    metrics: [
      { key: 'Admin endpoints', val: '50+' },
      { key: 'Categories', val: '7' },
      { key: 'Gateways', val: '2' },
      { key: 'Stack', val: 'Django' },
    ],
    links: [{ label: 'Repository', url: 'https://github.com/arifshekhk8/Aamal-Food' }],
  },
]

/** Coursework and smaller builds, listed rather than given full cards. */
export const sideProjects = [
  {
    title: 'AI-based loan-approval expert system',
    note: 'Hybrid rule-based, Bayesian and Random Forest pipeline over 4,269 applicants.',
    stack: 'Python · scikit-learn',
    url: 'https://github.com/arifshekhk8/AI-Course-Assignment',
  },
  {
    title: 'Library management system',
    note: 'Authentication, role-based access, loan tracking and an admin dashboard.',
    stack: 'C# · ASP.NET Core MVC',
    url: 'https://github.com/arifshekhk8/C-Sharp',
  },
  {
    title: 'OSPF dynamic-routing migration',
    note: 'Single-area OSPF across Dhaka, Chattogram and Sylhet, benchmarked against RIP.',
    stack: 'Cisco Packet Tracer',
    url: 'https://github.com/arifshekhk8/networking-assignment',
  },
  {
    title: 'Daily minimum temperature forecasting',
    note: 'Time-series forecasting on real climate records.',
    stack: 'Python · pandas',
    url: 'https://github.com/arifshekhk8/Daily-Minimum-Temperature-Forecasting',
  },
]

export default projects
