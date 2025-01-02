
export interface Data {
  jobId:string;
    company: string;
    role: string;
    skills: string;
    project_experience: string;
    other_details: string;
    job_description: string;
    evaluation_criteria: string;
    created_on:string;
    status:string;
  }

function createData(
    jobId:string,
    company: string,
    role: string,
    skills: string,
    project_experience: string,
    other_details: string,
    job_description: string,
    evaluation_criteria: string,
    created_on:string,
    status:string
  ): Data {
    return { jobId,company, role, skills, project_experience, other_details, job_description, evaluation_criteria,created_on,status };
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
      'Code quality, Problem-solving, Team collaboration.',
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
      'Analyze and visualize business data.',
      'Accuracy, Analytical thinking, Communication.',
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
      'Oversee project timelines and deliverables.',
      'Leadership, Time management, Risk assessment.',
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
      'Develop and maintain web applications.',
      'Code quality, Problem-solving, Team collaboration.',
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
      'Build machine learning models and derive actionable insights.',
      'Machine learning expertise, Critical thinking, Communication.',
      '2023-12-05',
      'Open'
    ),
  ];
  
  export default rows;
  


