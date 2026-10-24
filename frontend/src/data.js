export const profile = {
  name: 'Your Name',
  initials: 'YN',
  title: 'DevOps Engineer',
  location: 'India · Open to opportunities',
  email: 'hello@example.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  resume: '/resume.pdf',
  availability: 'Open to opportunities',
  intro: 'I build reliable delivery workflows and automate the path from code to production.',
  summary: 'I enjoy turning repetitive operational work into dependable systems. My focus is on Linux, containers, CI/CD, cloud fundamentals, infrastructure automation, and making deployments easier to understand and operate.',
};

export const skillGroups = [
  { title: 'Operating systems & scripting', icon: 'terminal', skills: ['Linux', 'Bash', 'Networking basics', 'Git'] },
  { title: 'Containers & orchestration', icon: 'container', skills: ['Docker', 'Docker Compose', 'Kubernetes', 'Minikube'] },
  { title: 'CI/CD & automation', icon: 'workflow', skills: ['Jenkins', 'GitHub Actions', 'Pipeline as Code', 'Shell automation'] },
  { title: 'Cloud & infrastructure', icon: 'cloud', skills: ['AWS fundamentals', 'Terraform', 'IAM fundamentals', 'Infrastructure as Code'] },
  { title: 'Observability & reliability', icon: 'activity', skills: ['Logs and metrics', 'Prometheus concepts', 'Grafana concepts', 'Health checks'] },
  { title: 'Development & data', icon: 'code', skills: ['Node.js', 'React', 'SQL', 'MySQL'] },
];

export const projects = [
  { id: 1, title: 'Automated CI/CD Delivery', category: 'CI/CD', status: 'Learning project', description: 'A Jenkins pipeline that checks out source code, runs validation, builds a container image, and deploys to a Kubernetes test environment.', stack: ['Jenkins', 'Docker', 'GitHub', 'Kubernetes'], icon: 'workflow', number: '01', details: 'Designed to make the path from a Git commit to a running workload repeatable and observable. Add your repository link and verified pipeline screenshots before publishing.' },
  { id: 2, title: 'Containerized Full-Stack App', category: 'Containers', status: 'Demo project', description: 'A React frontend and Node.js API packaged as separate services, with MySQL persistence and local orchestration using Compose.', stack: ['React', 'Node.js', 'MySQL', 'Docker Compose'], icon: 'layers', number: '02', details: 'Demonstrates service boundaries, environment-based configuration, health checks, and persistent database storage. Never commit real credentials.' },
  { id: 3, title: 'Kubernetes Application Platform', category: 'Kubernetes', status: 'Learning project', description: 'Deployments and Services with probes, resource requests, configuration, and a repeatable local workflow on Minikube.', stack: ['Kubernetes', 'kubectl', 'Minikube', 'YAML'], icon: 'boxes', number: '03', details: 'Focuses on workload lifecycle, service discovery, configuration, readiness, and safe rollouts. Add manifests and a diagram from your actual implementation.' },
  { id: 4, title: 'Infrastructure as Code', category: 'Cloud', status: 'Planned demo', description: 'A small Terraform example that describes cloud resources using variables, outputs, and least-privilege access patterns.', stack: ['Terraform', 'AWS', 'IAM', 'HCL'], icon: 'cloud', number: '04', details: 'Keep this project cost-conscious. Document estimated charges, destroy instructions, state storage, and any resources you actually provision.' },
  { id: 5, title: 'Service Health & Observability', category: 'Monitoring', status: 'Planned demo', description: 'A starter observability setup with health endpoints, metrics, dashboards, and actionable alert examples.', stack: ['Prometheus', 'Grafana', 'Metrics', 'Alerting'], icon: 'activity', number: '05', details: 'Use meaningful signals and alerts rather than decorative dashboards. Clearly label anything that is a mock-up or not yet deployed.' },
  { id: 6, title: 'Database Backup Runbook', category: 'Automation', status: 'Planned demo', description: 'A documented MySQL backup and restore workflow with scheduled execution, retention, and restore verification.', stack: ['MySQL', 'Bash', 'Cron', 'Linux'], icon: 'database', number: '06', details: 'A backup is only useful if it can be restored. Include a tested restore procedure and never expose real data in a public repository.' },
];

export const journey = [
  { date: 'CURRENT FOCUS', title: 'Building end-to-end DevOps projects', description: 'Practising containerization, CI/CD pipelines, Kubernetes deployments, Linux automation, and cloud fundamentals.' },
  { date: 'NEXT MILESTONE', title: 'Infrastructure and observability', description: 'Deepening Terraform, cloud networking, monitoring, alerting, security, and operational readiness.' },
];

// Replace these clearly labeled examples with verified personal details before publishing.
export const experience = [
  { label: 'CURRENT LEARNING', title: 'DevOps Engineering Practice', organization: 'Personal labs and portfolio projects', period: 'Ongoing', description: 'Building reproducible workflows around Linux, Docker, Jenkins, Kubernetes, cloud fundamentals, and infrastructure automation.', demo: true },
];

export const education = [
  { title: 'Add your degree or education', organization: 'Institution name', period: 'Year – Year', description: 'Replace this example with your actual education details.', demo: true },
];

export const certifications = [
  { title: 'Add a verified certification', issuer: 'Certification provider', period: 'Year', description: 'Only list certifications you have actually earned.', demo: true },
];

export const posts = [
  { title: 'What a Docker image actually contains', category: 'Containers', readTime: '5 min read', description: 'A draft topic for explaining image layers, build context, and repeatable application packaging.', status: 'Example topic' },
  { title: 'Understanding a Jenkins pipeline from commit to deployment', category: 'CI/CD', readTime: '7 min read', description: 'A draft topic for documenting checkout, tests, image creation, registry publishing, and deployment.', status: 'Example topic' },
  { title: 'Kubernetes Deployments, Pods, and Services', category: 'Kubernetes', readTime: '6 min read', description: 'A draft topic for explaining workload management and stable service discovery using a local cluster.', status: 'Example topic' },
];
