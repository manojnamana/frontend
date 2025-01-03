export interface Data {
    resumeId: string;
    name: string;
    role: string;
    email: string;
    resume_text: string;
    mobile: string;
    viewResume:string;
    match:string;
    status:string;
    actionTaken:string
  }
  
  function createData(
    resumeId: string,
    name: string,
    role: string,
    email: string,
    resume_text: string,
    mobile: string,
    viewResume:string,
    match:string,
    status:string,
    actionTaken:string
  ): Data {
    return { resumeId, name, role, email, resume_text, mobile,viewResume,match,status,actionTaken};
  }
  
  const ProfileRows = [
    createData(
      '1',
      'John Doe',
      'Software Engineer',
      'john.doe@example.com',
      'Built a scalable web application.',
      '123-456-7890',
      '/view/john-doe-resume',
      '80%',
      'In process',
      'Select'
    ),
    createData(
      '2',
      'Jane Smith',
      'Data Analyst',
      'jane.smith@example.com',
      'Analyzed sales data to increase revenue.',
      '098-765-4321',
      '/view/jane-smith-resume',
      '90%',
      'Rejected',
      'Reject'
    ),
    createData(
      '3',
      'Alice Johnson',
      'Project Manager',
      'alice.johnson@example.com',
      'Managed a cross-functional team for product delivery.',
      '567-890-1234',
      '/view/alice-johnson-resume',
      '85%',
      'Rejected',
      'Reject'
    ),
    createData(
      '4',
      'Bob Brown',
      'UX Designer',
      'bob.brown@example.com',
      'Redesigned the company website for improved usability.',
      '345-678-9012',
      '/view/bob-brown-resume',
      '70%',
      'In process',
      'Schedule Interview'
    ),
    createData(
      '5',
      'Eve Davis',
      'DevOps Engineer',
      'eve.davis@example.com',
      'Implemented CI/CD pipelines for faster deployments.',
      '234-567-8901',
      '/view/eve-davis-resume',
      '95%',
      'Selected',
      'Select'
    ),
  ];
  
  export default ProfileRows;
  