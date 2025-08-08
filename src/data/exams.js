export const allExams = [
    {
        id: 1,
        slug: "aws-certified-solutions-architect",
        title: "AWS Certified Solutions Architect - Associate",
        description: "This exam validates your ability to design and deploy scalable systems on AWS. The certification demonstrates your expertise in AWS technology across a wide range of AWS services.",
        questions: 250,
        duration: "180 mins",
        category: "Cloud Computing",
        difficulty: "Intermediate",
        popularity: 95,
        new: true,
        premium: false,
        rating: 4.8,
        students: 12500,
        lastUpdated: "2023-10-15",
        instructor: {
            name: "Jane Smith",
            role: "AWS Solutions Architect",
            experience: "8 years",
            students: 45000,
        },
        features: [
            "250+ practice questions with detailed explanations",
            "5 full-length mock exams",
            "Performance tracking dashboard",
            "Personalized study recommendations",
            "Access to AWS expert mentors"
        ],
        syllabus: [
            {
                week: 1,
                title: "AWS Fundamentals",
                topics: ["Cloud Concepts", "AWS Global Infrastructure", "Core AWS Services"]
            },
            {
                week: 2,
                title: "Designing Resilient Architectures",
                topics: ["Multi-tier architectures", "High availability", "Decoupling mechanisms"]
            }
        ],
        plans: [
            {
                id: 'standard',
                name: 'Standard',
                price: 99,
                duration: '6 months',
                features: [
                    'Full question bank access',
                    '3 mock exams',
                    'Basic performance analytics',
                    'Email support'
                ]
            },
            {
                id: 'premium',
                name: 'Premium',
                price: 149,
                duration: '12 months',
                features: [
                    'Everything in Standard',
                    '5 mock exams',
                    'Advanced analytics',
                    'Priority support',
                    'Mentor Q&A access'
                ]
            }
        ],
        faqs: [
            {
                question: "How long is the certification valid?",
                answer: "The AWS Certified Solutions Architect - Associate certification is valid for 3 years from the date you pass the exam."
            },
            {
                question: "What's the exam passing score?",
                answer: "The passing score is 720 on a scale of 100-1000. Our practice exams are calibrated to match this scoring system."
            }
        ]
    },
    {
        id: 2,
        slug: "google-cloud-digital-leader",
        title: "Google Cloud Digital Leader",
        description: "This certification introduces you to Google Cloud products and services, focusing on digital transformation strategies for businesses.",
        questions: 180,
        duration: "120 mins",
        category: "Cloud Computing",
        difficulty: "Beginner",
        popularity: 80,
        new: false,
        premium: false,
        rating: 4.5,
        students: 9800,
        lastUpdated: "2023-08-01",
        instructor: {
            name: "Carlos Gomez",
            role: "Cloud Consultant",
            experience: "6 years",
            students: 32000,
        },
        features: [
            "180 practice questions",
            "3 mock exams",
            "Progress tracking",
            "Google Cloud service demos"
        ],
        syllabus: [
            {
                week: 1,
                title: "Google Cloud Basics",
                topics: ["Cloud Computing Models", "GCP Overview", "Billing & Support"]
            },
            {
                week: 2,
                title: "Digital Transformation",
                topics: ["AI/ML on GCP", "Security & Compliance", "Migration Strategies"]
            }
        ],
        plans: [
            {
                id: 'standard',
                name: 'Standard',
                price: 79,
                duration: '6 months',
                features: [
                    'Question bank',
                    'Basic analytics',
                    'Email support'
                ]
            }
        ],
        faqs: [
            {
                question: "Is coding required?",
                answer: "No coding is required for this certification."
            }
        ]
    },
    {
        id: 3,
        slug: "ibm-data-science-professional",
        title: "IBM Data Science Professional Certificate",
        description: "This program teaches the foundational skills required for data science, including Python, SQL, data visualization, and machine learning.",
        questions: 300,
        duration: "200 mins",
        category: "Data Science",
        difficulty: "Advanced",
        popularity: 90,
        new: true,
        premium: true,
        rating: 4.9,
        students: 19000,
        lastUpdated: "2024-01-20",
        instructor: {
            name: "Linda Zhou",
            role: "Senior Data Scientist",
            experience: "10 years",
            students: 70000,
        },
        features: [
            "Hands-on Python & Jupyter Notebooks",
            "Machine learning labs",
            "SQL for data querying",
            "Capstone project"
        ],
        syllabus: [
            {
                week: 1,
                title: "Data Science Tools",
                topics: ["Python Basics", "Jupyter", "Git"]
            },
            {
                week: 2,
                title: "Data Analysis & ML",
                topics: ["Pandas & Numpy", "Supervised Learning", "Model Evaluation"]
            }
        ],
        plans: [
            {
                id: 'premium',
                name: 'Premium',
                price: 129,
                duration: '9 months',
                features: [
                    'Full access',
                    'Capstone support',
                    '1-on-1 mentorship',
                    'Certificate of completion'
                ]
            }
        ],
        faqs: [
            {
                question: "Do I need prior coding experience?",
                answer: "Some programming familiarity is helpful, but beginners can start with support from mentors."
            }
        ]
    },
    {
        id: 4,
        slug: "certified-cybersecurity-associate",
        title: "Certified Cybersecurity Associate",
        description: "This course covers foundational knowledge of security threats, network defense, and ethical hacking techniques.",
        questions: 200,
        duration: "150 mins",
        category: "Security",
        difficulty: "Intermediate",
        popularity: 78,
        new: false,
        premium: false,
        rating: 4.4,
        students: 8500,
        lastUpdated: "2023-05-10",
        instructor: {
            name: "Ravi Kumar",
            role: "Security Analyst",
            experience: "7 years",
            students: 24000,
        },
        features: [
            "Security theory & practical labs",
            "Threat analysis tools",
            "Risk management tutorials"
        ],
        syllabus: [
            {
                week: 1,
                title: "Network Security Basics",
                topics: ["Firewalls", "IDS/IPS", "Access Controls"]
            },
            {
                week: 2,
                title: "Cyber Threats & Defense",
                topics: ["Malware Types", "Social Engineering", "Security Audits"]
            }
        ],
        plans: [
            {
                id: 'standard',
                name: 'Standard',
                price: 89,
                duration: '6 months',
                features: [
                    'Practice labs',
                    'Mock exam access',
                    'Security toolkit downloads'
                ]
            }
        ],
        faqs: [
            {
                question: "Is this exam recognized globally?",
                answer: "Yes, it’s recognized by several cybersecurity alliances and hiring partners."
            }
        ]
    },
    {
        id: 5,
        slug: "full-stack-developer-certification",
        title: "Full Stack Developer Certification",
        description: "Learn frontend and backend development with real-world projects covering HTML, CSS, JavaScript, Node.js, and React.",
        questions: 350,
        duration: "240 mins",
        category: "Web Development",
        difficulty: "Advanced",
        popularity: 97,
        new: true,
        premium: true,
        rating: 5.0,
        students: 21000,
        lastUpdated: "2024-04-01",
        instructor: {
            name: "Alicia Mendes",
            role: "Full Stack Engineer",
            experience: "9 years",
            students: 62000,
        },
        features: [
            "End-to-end project building",
            "Interview preparation",
            "Git & deployment workflows"
        ],
        syllabus: [
            {
                week: 1,
                title: "Frontend Basics",
                topics: ["HTML/CSS", "JavaScript", "DOM Manipulation"]
            },
            {
                week: 2,
                title: "Backend & APIs",
                topics: ["Node.js", "Express", "MongoDB"]
            }
        ],
        plans: [
            {
                id: 'standard',
                name: 'Standard',
                price: 109,
                duration: '8 months',
                features: [
                    'Project templates',
                    'Job-ready mock interviews',
                    'Mentorship calls'
                ]
            }
        ],
        faqs: [
            {
                question: "Does this course offer certification?",
                answer: "Yes, you receive a verifiable certificate after completing the final project."
            }
        ]
    },
    {
        id: 6,
        slug: "python-foundation-certification",
        title: "Python Foundation Certification",
        description: "This certification course provides a comprehensive introduction to Python, covering programming fundamentals and problem-solving techniques.",
        questions: 160,
        duration: "120 mins",
        category: "Programming",
        difficulty: "Beginner",
        popularity: 88,
        new: true,
        premium: false,
        rating: 4.6,
        students: 15000,
        lastUpdated: "2024-02-12",
        instructor: {
            name: "Michael Chen",
            role: "Python Developer",
            experience: "5 years",
            students: 35000
        },
        features: [
            "Interactive coding challenges",
            "Beginner-friendly exercises",
            "Real-world problem sets"
        ],
        syllabus: [
            {
                week: 1,
                title: "Python Basics",
                topics: ["Variables", "Data Types", "Control Flow"]
            },
            {
                week: 2,
                title: "Functions & Modules",
                topics: ["Functions", "Modules", "Error Handling"]
            }
        ],
        plans: [
            {
                id: 'standard',
                name: 'Standard',
                price: 59,
                duration: '3 months',
                features: [
                    'Practice problems',
                    '2 mock exams',
                    'Certificate access'
                ]
            }
        ],
        faqs: [
            {
                question: "Is this course suitable for kids?",
                answer: "Yes, the course is designed for anyone 13+ with an interest in programming."
            }
        ]
    },
    {
        id: 7,
        slug: "salesforce-administrator-certification",
        title: "Salesforce Administrator Certification",
        description: "Prepare for the official Salesforce Admin exam with hands-on training, scenario-based questions, and real platform walkthroughs.",
        questions: 140,
        duration: "100 mins",
        category: "CRM & Business",
        difficulty: "Intermediate",
        popularity: 76,
        new: false,
        premium: true,
        rating: 4.3,
        students: 9700,
        lastUpdated: "2023-11-10",
        instructor: {
            name: "Priya Desai",
            role: "Salesforce Consultant",
            experience: "6 years",
            students: 28000
        },
        features: [
            "Salesforce dashboard walkthroughs",
            "Admin use-cases",
            "Platform quizzes"
        ],
        syllabus: [
            {
                week: 1,
                title: "User Management",
                topics: ["Profiles", "Roles", "Permission Sets"]
            },
            {
                week: 2,
                title: "Data Security",
                topics: ["Object Permissions", "Sharing Rules", "Field Level Security"]
            }
        ],
        plans: [
            {
                id: 'premium',
                name: 'Premium',
                price: 139,
                duration: '6 months',
                features: [
                    'All modules access',
                    'Priority support',
                    'Interactive mock platform'
                ]
            }
        ],
        faqs: [
            {
                question: "Do I need access to a Salesforce account?",
                answer: "We provide a free developer account setup guide for practice."
            }
        ]
    },
    {
        id: 8,
        slug: "ai-for-business-leaders",
        title: "AI for Business Leaders",
        description: "This certification helps managers and entrepreneurs understand how to implement AI and machine learning in business strategies.",
        questions: 120,
        duration: "90 mins",
        category: "Business & Strategy",
        difficulty: "Beginner",
        popularity: 82,
        new: true,
        premium: true,
        rating: 4.7,
        students: 11400,
        lastUpdated: "2024-06-01",
        instructor: {
            name: "Anita Rao",
            role: "AI Strategy Consultant",
            experience: "12 years",
            students: 39000
        },
        features: [
            "Non-technical AI concepts",
            "Real-world case studies",
            "ROI and value mapping"
        ],
        syllabus: [
            {
                week: 1,
                title: "What is AI?",
                topics: ["AI vs ML", "Business Use Cases"]
            },
            {
                week: 2,
                title: "AI Strategy",
                topics: ["Implementation Planning", "Vendor Tools", "Ethics"]
            }
        ],
        plans: [
            {
                id: 'premium',
                name: 'Premium',
                price: 119,
                duration: '4 months',
                features: [
                    'Full access to modules',
                    'Business templates',
                    'AI strategy Q&A bank'
                ]
            }
        ],
        faqs: [
            {
                question: "Is this course technical?",
                answer: "No coding required. It's tailored for decision-makers and managers."
            }
        ]
    },
    {
        id: 9,
        slug: "ethical-hacking-certification",
        title: "Certified Ethical Hacking (CEH) Exam Prep",
        description: "Master ethical hacking tools and techniques used by penetration testers and white-hat hackers to identify and fix vulnerabilities.",
        questions: 280,
        duration: "180 mins",
        category: "Security",
        difficulty: "Advanced",
        popularity: 93,
        new: true,
        premium: true,
        rating: 4.9,
        students: 22000,
        lastUpdated: "2024-03-15",
        instructor: {
            name: "Omar Malik",
            role: "Ethical Hacker & Instructor",
            experience: "11 years",
            students: 75000
        },
        features: [
            "Real-world attack simulations",
            "Kali Linux labs",
            "Vulnerability assessment challenges"
        ],
        syllabus: [
            {
                week: 1,
                title: "Reconnaissance & Scanning",
                topics: ["Footprinting", "Network Scanning", "Enumeration"]
            },
            {
                week: 2,
                title: "System Hacking & Tools",
                topics: ["Password Cracking", "Privilege Escalation", "Sniffers"]
            }
        ],
        plans: [
            {
                id: 'pro',
                name: 'Pro Plan',
                price: 159,
                duration: '12 months',
                features: [
                    'All advanced content',
                    'Live instructor Q&A',
                    'Job interview prep pack'
                ]
            }
        ],
        faqs: [
            {
                question: "Does this prep include practice labs?",
                answer: "Yes, with real hands-on simulated labs modeled after real attack scenarios."
            }
        ]
    }
];
