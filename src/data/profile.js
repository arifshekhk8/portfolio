export const profile = {
  name: 'Md. Arif Shekh',
  shortName: 'Arif Shekh',
  handle: 'arifshekhk8',
  roles: [
    'AI / Machine Learning Engineer',
    'Computer Vision',
    'Backend Developer',
  ],
  tagline: 'AI/ML · Computer Vision · Backend',
  location: 'Dhaka, Bangladesh',
  status: 'Open to internships and entry-level roles',

  /* Kept deliberately short. The long version lives in the About section. */
  blurb:
    'Final-year CSE student at IUBAT who builds machine-learning systems that have to hold up outside a notebook.',

  bio: [
    'I am in my final year of Computer Science and Engineering at IUBAT, sitting on a 3.69 CGPA, and most of what I actually know came from entering competitions and then having to make the thing run. Two of them ended with my team second in the country: the bKash NSUCEC Cybernauts Datathon and the DUET CSE Carnival AI Hackathon. I led both teams.',
    'The work splits about evenly. On the research side I write papers. MedKAN, a Kolmogorov-Arnold Network for brain-tumour MRI, went to SPICSCON 2026, and my thesis on pedestrian crossing intention is being prepared for a journal. On the engineering side I build the backends, mostly Django and FastAPI, because a model nobody can call is not a product yet.',
    'I also present, which turns out to matter more than people expect once you are standing at a grand finale with four minutes and a projector. Bangla is my first language and I work in English every day. Right now I am looking for a team where the model has to survive contact with real data.',
  ],

  metrics: [
    { key: 'CGPA', val: '3.69', note: 'out of 4.00' },
    { key: 'National podiums', val: '2', note: 'as team lead' },
    { key: 'Papers', val: '2', note: 'first author' },
    { key: 'Shipped projects', val: '12', note: 'and counting' },
  ],

  contact: {
    email: 'shekharif409@gmail.com',
    location: 'Dhaka, Bangladesh',
  },

  socials: [
    { id: 'github', label: 'GitHub', handle: '@arifshekhk8', url: 'https://github.com/arifshekhk8' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'in/arif-shekh', url: 'https://www.linkedin.com/in/arif-shekh/' },
    { id: 'kaggle', label: 'Kaggle', handle: '@arifshekh', url: 'https://www.kaggle.com/arifshekh' },
    { id: 'mail', label: 'Email', handle: 'shekharif409@gmail.com', url: 'mailto:shekharif409@gmail.com' },
  ],

  education: [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      org: 'IUBAT — International University of Business Agriculture and Technology',
      result: 'CGPA 3.69 / 4.00',
      period: '2023 — 2026 (expected)',
    },
    {
      degree: 'Higher Secondary Certificate, Science',
      org: 'Rajbari Government College',
      result: 'GPA 5.00 / 5.00',
      period: '2021',
    },
    {
      degree: 'Secondary School Certificate, Science',
      org: 'Rajbari Government High School',
      result: 'GPA 5.00 / 5.00',
      period: '2019',
    },
  ],

  languages: [
    { name: 'Bangla', level: 'Native' },
    { name: 'English', level: 'Professional, fluent in speaking, writing and presentation' },
  ],

  references: [
    {
      name: 'Md. Alamin Sikder Shihab',
      role: 'Director, Branding and Public Relations Office',
      org: 'IUBAT',
      email: 'pro@iubat.edu',
    },
    {
      name: 'Sheekar Banerjee',
      role: 'Lecturer, Department of Computer Science & Engineering',
      org: 'IUBAT',
      email: 'sheekar.cse@iubat.edu',
    },
  ],
}

export default profile
