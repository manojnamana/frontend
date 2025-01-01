
export interface Data {
  jobId:string;
    company: string;
    role: string;
    skills: string;
    project_experience: string;
    other_details: string;
    job_description: string;
    evaluation_criteria: string;
  }

function createData(
    jobId:string,
    company: string,
    role: string,
    skills: string,
    project_experience: string,
    other_details: string,
    job_description: string,
    evaluation_criteria: string
  ): Data {
    return { jobId,company, role, skills, project_experience, other_details, job_description, evaluation_criteria };
  }
const rows = [
    createData(
      '1',
      'TechCorp',
      'Software Engineer',
      'JavaScript, React, Node.js',
      'Built a scalable web application.',
      'Remote-friendly, Flexible hours.',
      'We are looking for a [motivated/experienced/dedicated] [Job Title] to join our team. The ideal candidate will be responsible for [list core responsibilities or tasks, e.g., designing and implementing software solutions, managing marketing campaigns, handling customer inquiries, etc.].',
      'Code quality, Problem-solving, Team collaboration.'
    ),
    createData(
      '2',
      'DataSolutions',
      'Data Analyst',
      'Python, SQL, Tableau',
      'Analyzed sales data to increase revenue.',
      'Hybrid role, Full-time.',
      'Analyze and visualize business data.',
      'Accuracy, Analytical thinking, Communication.'
    ),
    createData(
      '3',
      'Innovatech',
      'Project Manager',
      'Leadership, Agile, JIRA',
      'Managed a cross-functional team for product delivery.',
      'On-site, Leadership role.',
      'Oversee project timelines and deliverables.',
      'Leadership, Time management, Risk assessment.'
    ),
    createData(
      '4',
      'TechCorp',
      'Software Engineer',
      'JavaScript, React, Node.js',
      'Built a scalable web application.',
      'Remote-friendly, Flexible hours.',
      'Develop and maintain web applications.',
      'Code quality, Problem-solving, Team collaboration.'
    ),
    createData(
      '5',
      'DataSolutions',
      'Data Analyst',
      'Python, SQL, Tableau',
      'Analyzed sales data to increase revenue.',
      'Hybrid role, Full-time.',
      'Analyze and visualize business data.',
      'Accuracy, Analytical thinking, Communication.'
    ),

  ];

export default rows
