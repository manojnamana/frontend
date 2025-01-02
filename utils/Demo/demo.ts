export interface Data {
  jobId: string;
  company: string;
  role: string;
  skills: string;
  project_experience: string;
  other_details: string;
  job_description: string;
  evaluation_criteria: string;
  created_on: string;
  status: string;
}

function createData(
  jobId: string,
  company: string,
  role: string,
  skills: string,
  project_experience: string,
  other_details: string,
  job_description: string,
  evaluation_criteria: string,
  created_on: string,
  status: string
): Data {
  return { jobId, company, role, skills, project_experience, other_details, job_description, evaluation_criteria, created_on, status };
}

const rows = [
  createData(
    '1',
    'TechCorp',
    'Software Engineer',
    'JavaScript, React, Node.js',
    'Built a scalable web application.',
    'Remote-friendly, Flexible hours.',
    'We are looking for a motivated Software Engineer to join our team. The ideal candidate will be responsible for designing, developing, and maintaining web applications. This includes collaborating with cross-functional teams, optimizing performance, and ensuring code quality through rigorous testing and review.',
    'Candidates will be evaluated on their demonstrated proficiency in JavaScript, React, and Node.js, along with their ability to solve complex problems efficiently and showcase effective teamwork and communication skills. A review of previous projects or GitHub contributions will assess code quality and creativity, while alignment with our company values of innovation and collaboration will determine cultural fit.',
    '2023-12-01',
    'Active'
  ),
  createData(
    '2',
    'DataSolutions',
    'Data Analyst',
    'Python, SQL, Tableau',
    'Analyzed sales data to increase revenue.',
    'Hybrid role, Full-time.',
    'We are seeking a detail-oriented Data Analyst to join our team. The role involves interpreting complex datasets, creating visualizations, and presenting insights that drive strategic decisions. The candidate will work closely with stakeholders to identify trends and deliver actionable recommendations.',
    'Evaluation will focus on the candidate’s expertise in Python, SQL, and Tableau, alongside their ability to translate data into actionable insights. Strong analytical thinking, excellent communication skills, and a proven track record of delivering impactful visualizations will be key criteria.',
    '2023-12-02',
    'Active'
  ),
  createData(
    '3',
    'Innovatech',
    'Project Manager',
    'Leadership, Agile, JIRA',
    'Managed a cross-functional team for product delivery.',
    'On-site, Leadership role.',
    'Innovatech is looking for a proactive Project Manager to oversee project timelines, coordinate with teams, and ensure timely delivery of quality products. The ideal candidate will drive project planning, risk assessment, and stakeholder communication while fostering a culture of excellence.',
    'Applicants must demonstrate strong leadership skills, experience in Agile methodologies, and expertise in tools like JIRA. The ability to manage risks, prioritize tasks, and maintain clear communication with stakeholders will be critical to success.',
    '2023-12-03',
    'Active'
  ),
  createData(
    '4',
    'TechCorp',
    'Software Engineer',
    'JavaScript, React, Node.js',
    'Built a scalable web application.',
    'Remote-friendly, Flexible hours.',
    'We are looking for a skilled Software Engineer to develop innovative web solutions and contribute to maintaining existing systems. The role involves problem-solving, optimizing performance, and working collaboratively to deliver high-quality products.',
    'Candidates will be assessed on their technical expertise in JavaScript, React, and Node.js, problem-solving capabilities, and teamwork. A portfolio of past projects demonstrating code quality and creative approaches, along with alignment to our innovative culture, will be key evaluation points.',
    '2023-12-04',
    'Active'
  ),
  createData(
    '5',
    'DataSolutions',
    'Data Scientist',
    'Python, R, Machine Learning, Data Visualization',
    'Developed predictive models to optimize marketing campaigns.',
    'Hybrid role, Full-time.',
    'We are seeking a Data Scientist to build advanced machine learning models and provide actionable insights that influence business decisions. The role includes data preprocessing, feature engineering, and presenting findings to non-technical stakeholders.',
    'Evaluation criteria include proficiency in Python, R, and machine learning algorithms, critical thinking, and the ability to visualize complex data effectively. A demonstrated ability to derive business value from data science initiatives will be crucial.',
    '2023-12-05',
    'Open'
  ),
];

export default rows;
