export interface Data {
    resumeId: string;
    name: string;
    role: string;
    email: string;
    resume_text: string;
    mobile: string;
  }
  
  function createData(
    resumeId: string,
    name: string,
    role: string,
    email: string,
    resume_text: string,
    mobile: string
  ): Data {
    return { resumeId, name, role, email, resume_text, mobile };
  }
  
  const ProfileRows = [
    createData(
      '1',
      'John Doe',
      'Software Engineer',
      'john.doe@example.com',
      'Built a scalable web application.',
      '123-456-7890'
    ),
    createData(
      '2',
      'Jane Smith',
      'Data Analyst',
      'jane.smith@example.com',
      'Analyzed sales data to increase revenue.',
      '098-765-4321'
    ),
    createData(
      '3',
      'Alice Johnson',
      'Project Manager',
      'alice.johnson@example.com',
      'Managed a cross-functional team for product delivery.',
      '567-890-1234'
    ),
    createData(
      '4',
      'Bob Brown',
      'UX Designer',
      'bob.brown@example.com',
      'Redesigned the company website for improved usability.',
      '345-678-9012'
    ),
    createData(
      '5',
      'Eve Davis',
      'DevOps Engineer',
      'eve.davis@example.com',
      'Implemented CI/CD pipelines for faster deployments.',
      '234-567-8901'
    ),
  ];
  
  export default ProfileRows