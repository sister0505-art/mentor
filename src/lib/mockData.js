// ============================================================
// R&D TECH 공채 1기 육성 대시보드 - 모의 데이터
// ============================================================

export const teams = [
  { id: 'team-1', name: 'AI플랫폼팀', department: 'R&D센터' },
  { id: 'team-2', name: '데이터엔지니어링팀', department: 'R&D센터' },
  { id: 'team-3', name: '클라우드인프라팀', department: 'R&D센터' },
  { id: 'team-4', name: 'SW개발팀', department: 'R&D센터' },
];

export const users = [
  // 관리자
  {
    id: 'admin-1',
    email: 'admin@rdtech.com',
    password: 'admin123',
    name: '김관리',
    role: 'admin',
    teamId: null,
    mentorId: null,
    avatar: '👑',
    position: 'HR 매니저',
  },
  // 팀장들
  {
    id: 'lead-1',
    email: 'lead1@rdtech.com',
    password: 'lead123',
    name: '박팀장',
    role: 'team_lead',
    teamId: 'team-1',
    mentorId: null,
    avatar: '🏆',
    position: 'AI플랫폼팀 팀장',
  },
  {
    id: 'lead-2',
    email: 'lead2@rdtech.com',
    password: 'lead123',
    name: '이팀장',
    role: 'team_lead',
    teamId: 'team-2',
    mentorId: null,
    avatar: '🏆',
    position: '데이터엔지니어링팀 팀장',
  },
  {
    id: 'lead-3',
    email: 'lead3@rdtech.com',
    password: 'lead123',
    name: '최팀장',
    role: 'team_lead',
    teamId: 'team-3',
    mentorId: null,
    avatar: '🏆',
    position: '클라우드인프라팀 팀장',
  },
  {
    id: 'lead-4',
    email: 'lead4@rdtech.com',
    password: 'lead123',
    name: '정팀장',
    role: 'team_lead',
    teamId: 'team-4',
    mentorId: null,
    avatar: '🏆',
    position: 'SW개발팀 팀장',
  },
  // 멘토들
  {
    id: 'mentor-1',
    email: 'mentor1@rdtech.com',
    password: 'mentor123',
    name: '강멘토',
    role: 'mentor',
    teamId: 'team-1',
    mentorId: null,
    avatar: '🎯',
    position: 'AI플랫폼팀 선임연구원',
  },
  {
    id: 'mentor-2',
    email: 'mentor2@rdtech.com',
    password: 'mentor123',
    name: '윤멘토',
    role: 'mentor',
    teamId: 'team-2',
    mentorId: null,
    avatar: '🎯',
    position: '데이터엔지니어링팀 선임연구원',
  },
  {
    id: 'mentor-3',
    email: 'mentor3@rdtech.com',
    password: 'mentor123',
    name: '한멘토',
    role: 'mentor',
    teamId: 'team-3',
    mentorId: null,
    avatar: '🎯',
    position: '클라우드인프라팀 선임연구원',
  },
  {
    id: 'mentor-4',
    email: 'mentor4@rdtech.com',
    password: 'mentor123',
    name: '서멘토',
    role: 'mentor',
    teamId: 'team-4',
    mentorId: null,
    avatar: '🎯',
    position: 'SW개발팀 선임연구원',
  },
  // 공채 사원들
  {
    id: 'trainee-1',
    email: 'trainee1@rdtech.com',
    password: 'trainee123',
    name: '강동윤',
    role: 'trainee',
    teamId: 'team-1',
    mentorId: 'mentor-1',
    avatar: '🌱',
    position: 'AI플랫폼팀 연구원',
  },
  {
    id: 'trainee-2',
    email: 'trainee2@rdtech.com',
    password: 'trainee123',
    name: '강태호',
    role: 'trainee',
    teamId: 'team-1',
    mentorId: 'mentor-1',
    avatar: '🌱',
    position: 'AI플랫폼팀 연구원',
  },
  {
    id: 'trainee-3',
    email: 'trainee3@rdtech.com',
    password: 'trainee123',
    name: '김기중',
    role: 'trainee',
    teamId: 'team-2',
    mentorId: 'mentor-2',
    avatar: '🌱',
    position: '데이터엔지니어링팀 연구원',
  },
  {
    id: 'trainee-4',
    email: 'trainee4@rdtech.com',
    password: 'trainee123',
    name: '김성윤',
    role: 'trainee',
    teamId: 'team-3',
    mentorId: 'mentor-3',
    avatar: '🌱',
    position: '클라우드인프라팀 연구원',
  },
  {
    id: 'trainee-5',
    email: 'trainee5@rdtech.com',
    password: 'trainee123',
    name: '김지호',
    role: 'trainee',
    teamId: 'team-4',
    mentorId: 'mentor-4',
    avatar: '🌱',
    position: 'SW개발팀 연구원',
  },
  {
    id: 'trainee-6',
    email: 'trainee6@rdtech.com',
    password: 'trainee123',
    name: '김찬수',
    role: 'trainee',
    teamId: 'team-2',
    mentorId: 'mentor-2',
    avatar: '🌱',
    position: '데이터엔지니어링팀 연구원',
  },
  {
    id: 'trainee-7',
    email: 'trainee7@rdtech.com',
    password: 'trainee123',
    name: '박상우',
    role: 'trainee',
    teamId: 'team-3',
    mentorId: 'mentor-3',
    avatar: '🌱',
    position: '클라우드인프라팀 연구원',
  },
  {
    id: 'trainee-8',
    email: 'trainee8@rdtech.com',
    password: 'trainee123',
    name: '박진희',
    role: 'trainee',
    teamId: 'team-4',
    mentorId: 'mentor-4',
    avatar: '🌱',
    position: 'SW개발팀 연구원',
  },
  {
    id: 'trainee-9',
    email: 'trainee9@rdtech.com',
    password: 'trainee123',
    name: '서혁진',
    role: 'trainee',
    teamId: 'team-1',
    mentorId: 'mentor-1',
    avatar: '🌱',
    position: 'AI플랫폼팀 연구원',
  },
  {
    id: 'trainee-10',
    email: 'trainee10@rdtech.com',
    password: 'trainee123',
    name: '소연',
    role: 'trainee',
    teamId: 'team-2',
    mentorId: 'mentor-2',
    avatar: '🌱',
    position: '데이터엔지니어링팀 연구원',
  },
  {
    id: 'trainee-11',
    email: 'trainee11@rdtech.com',
    password: 'trainee123',
    name: '유재용',
    role: 'trainee',
    teamId: 'team-3',
    mentorId: 'mentor-3',
    avatar: '🌱',
    position: '클라우드인프라팀 연구원',
  },
  {
    id: 'trainee-12',
    email: 'trainee12@rdtech.com',
    password: 'trainee123',
    name: '윤희철',
    role: 'trainee',
    teamId: 'team-4',
    mentorId: 'mentor-4',
    avatar: '🌱',
    position: 'SW개발팀 연구원',
  },
  {
    id: 'trainee-13',
    email: 'trainee13@rdtech.com',
    password: 'trainee123',
    name: '임세빈',
    role: 'trainee',
    teamId: 'team-1',
    mentorId: 'mentor-1',
    avatar: '🌱',
    position: 'AI플랫폼팀 연구원',
  },
  {
    id: 'trainee-14',
    email: 'trainee14@rdtech.com',
    password: 'trainee123',
    name: '임효승',
    role: 'trainee',
    teamId: 'team-2',
    mentorId: 'mentor-2',
    avatar: '🌱',
    position: '데이터엔지니어링팀 연구원',
  },
  {
    id: 'trainee-15',
    email: 'trainee15@rdtech.com',
    password: 'trainee123',
    name: '정우서',
    role: 'trainee',
    teamId: 'team-3',
    mentorId: 'mentor-3',
    avatar: '🌱',
    position: '클라우드인프라팀 연구원',
  },
  {
    id: 'trainee-16',
    email: 'trainee16@rdtech.com',
    password: 'trainee123',
    name: '정우진',
    role: 'trainee',
    teamId: 'team-4',
    mentorId: 'mentor-4',
    avatar: '🌱',
    position: 'SW개발팀 연구원',
  },
  {
    id: 'trainee-17',
    email: 'trainee17@rdtech.com',
    password: 'trainee123',
    name: '최우원',
    role: 'trainee',
    teamId: 'team-1',
    mentorId: 'mentor-1',
    avatar: '🌱',
    position: 'AI플랫폼팀 연구원',
  },
  {
    id: 'trainee-18',
    email: 'trainee18@rdtech.com',
    password: 'trainee123',
    name: '황병찬',
    role: 'trainee',
    teamId: 'team-2',
    mentorId: 'mentor-2',
    avatar: '🌱',
    position: '데이터엔지니어링팀 연구원',
  },
  {
    id: 'trainee-19',
    email: 'trainee19@rdtech.com',
    password: 'trainee123',
    name: '신규입사자 (이름미상)',
    role: 'trainee',
    teamId: 'team-3',
    mentorId: 'mentor-3',
    avatar: '🌱',
    position: '클라우드인프라팀 연구원',
  },
];

export const trainingPlans = [
  {
    id: 'tp-1',
    traineeId: 'trainee-1',
    authorId: 'mentor-1',
    title: '딥러닝 기초 교육',
    category: 'education',
    description: 'PyTorch 기반 딥러닝 기초 이론 및 실습. CNN, RNN, Transformer 아키텍처 학습.',
    startDate: '2026-06-15',
    endDate: '2026-07-15',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'tp-2',
    traineeId: 'trainee-1',
    authorId: 'mentor-1',
    title: 'AI 모델 배포 파이프라인 실습',
    category: 'mentoring',
    description: '멘토와 함께 실제 AI 모델을 프로덕션 환경에 배포하는 과정 학습. MLOps 기초.',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    status: 'in_progress',
    progress: 65,
  },
  {
    id: 'tp-3',
    traineeId: 'trainee-1',
    authorId: 'lead-1',
    title: '팀 업무 프로세스 이해',
    category: 'team_work',
    description: 'AI플랫폼팀의 업무 프로세스, 코드 리뷰 문화, 배포 절차 등 팀 워크플로우 익히기.',
    startDate: '2026-06-15',
    endDate: '2026-08-15',
    status: 'in_progress',
    progress: 80,
  },
  {
    id: 'tp-4',
    traineeId: 'trainee-1',
    authorId: 'mentor-1',
    title: 'AI EXPO 2026 참관',
    category: 'external',
    description: '코엑스에서 열리는 AI EXPO 2026 박람회 참관. 최신 AI 기술 동향 파악.',
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    status: 'planned',
    progress: 0,
  },
  {
    id: 'tp-5',
    traineeId: 'trainee-1',
    authorId: 'lead-1',
    title: '직무 적응도 체크 (1차)',
    category: 'adaptation',
    description: '배치 후 2개월 시점 직무 적응 상태 점검. 업무 이해도, 대인관계, 직무 만족도 평가.',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    status: 'planned',
    progress: 0,
  },
  {
    id: 'tp-6',
    traineeId: 'trainee-2',
    authorId: 'mentor-1',
    title: 'NLP 기초 과정',
    category: 'education',
    description: '자연어처리 기초 이론 학습. 토크나이저, 임베딩, Seq2Seq 모델.',
    startDate: '2026-06-15',
    endDate: '2026-07-30',
    status: 'in_progress',
    progress: 45,
  },
  {
    id: 'tp-7',
    traineeId: 'trainee-3',
    authorId: 'mentor-2',
    title: 'Apache Spark 실무 교육',
    category: 'education',
    description: 'Spark를 활용한 대규모 데이터 처리 실습.',
    startDate: '2026-06-20',
    endDate: '2026-08-20',
    status: 'in_progress',
    progress: 55,
  },
  {
    id: 'tp-8',
    traineeId: 'trainee-3',
    authorId: 'mentor-2',
    title: '데이터 파이프라인 구축 멘토링',
    category: 'mentoring',
    description: '멘토와 함께 실제 ETL 파이프라인 구축 프로젝트 수행.',
    startDate: '2026-07-15',
    endDate: '2026-09-30',
    status: 'planned',
    progress: 10,
  },
  {
    id: 'tp-9',
    traineeId: 'trainee-4',
    authorId: 'mentor-3',
    title: 'AWS/GCP 클라우드 인프라 교육',
    category: 'education',
    description: 'AWS와 GCP 기반 클라우드 인프라 설계 및 운영 교육.',
    startDate: '2026-06-15',
    endDate: '2026-08-15',
    status: 'in_progress',
    progress: 70,
  },
  {
    id: 'tp-10',
    traineeId: 'trainee-5',
    authorId: 'mentor-4',
    title: 'React/Next.js 프론트엔드 실무',
    category: 'mentoring',
    description: '실무 프로젝트에서 React와 Next.js를 활용한 프론트엔드 개발 멘토링.',
    startDate: '2026-06-20',
    endDate: '2026-09-20',
    status: 'in_progress',
    progress: 40,
  },
  {
    id: 'tp-11',
    traineeId: 'trainee-6',
    authorId: 'mentor-2',
    title: 'SQL 고급 과정',
    category: 'education',
    description: '복잡한 쿼리 작성, 성능 최적화, 데이터 모델링 심화.',
    startDate: '2026-06-15',
    endDate: '2026-07-31',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'tp-12',
    traineeId: 'trainee-5',
    authorId: 'lead-4',
    title: '코드 리뷰 문화 적응',
    category: 'adaptation',
    description: 'SW개발팀 코드 리뷰 프로세스에 적응. PR 작성법, 리뷰 방법론 학습.',
    startDate: '2026-06-15',
    endDate: '2026-07-31',
    status: 'in_progress',
    progress: 60,
  },
];

export const posts = [
  {
    id: 'post-1',
    authorId: 'trainee-1',
    trainingPlanId: 'tp-1',
    title: '딥러닝 기초 교육 1주차 후기',
    content: '이번 주에는 CNN 아키텍처의 기본 구조를 학습했습니다. 컨볼루션 레이어, 풀링 레이어의 동작 원리를 이해하고, 간단한 이미지 분류 모델을 직접 구현해 보았습니다.\n\n특히 멘토님께서 실무에서 자주 사용하는 ResNet 구조에 대해 추가 설명해 주셔서 많은 도움이 되었습니다.\n\n다음 주에는 RNN과 LSTM을 학습할 예정입니다.',
    postType: 'weekly_report',
    links: [
      { url: 'https://pytorch.org/tutorials/', label: 'PyTorch 공식 튜토리얼' },
    ],
    createdAt: '2026-06-22T09:00:00',
    updatedAt: '2026-06-22T09:00:00',
  },
  {
    id: 'post-2',
    authorId: 'mentor-1',
    trainingPlanId: 'tp-2',
    title: '김신입 AI 모델 배포 멘토링 1차 피드백',
    content: '김신입 연구원이 Docker 컨테이너화 작업을 잘 수행하고 있습니다. 기본적인 Dockerfile 작성은 무리 없이 해내고 있으며, multi-stage build에 대한 이해도 빠르게 향상되고 있습니다.\n\n개선 포인트:\n- CI/CD 파이프라인 이해 부족 → 추가 교육 필요\n- 모니터링 도구(Grafana, Prometheus) 학습 예정\n\n전반적으로 적응이 빠르고 학습 의지가 높습니다.',
    postType: 'mentor_feedback',
    links: [],
    createdAt: '2026-07-10T14:30:00',
    updatedAt: '2026-07-10T14:30:00',
  },
  {
    id: 'post-3',
    authorId: 'lead-1',
    trainingPlanId: 'tp-3',
    title: 'AI플랫폼팀 신입사원 7월 종합 리뷰',
    content: '7월 한 달간 AI플랫폼팀에 배치된 신입사원 2명(김신입, 이신입)의 업무 적응 상황을 종합 리뷰합니다.\n\n**김신입**: 팀 업무 프로세스를 빠르게 이해하고 있으며, 코드 리뷰에도 적극적으로 참여합니다. 딥러닝 교육 완료 후 실무 프로젝트 투입 준비가 되어 있습니다.\n\n**이신입**: NLP 교육을 진행 중이며, 기초 단계에서 약간의 어려움이 있으나 꾸준히 성장하고 있습니다. 멘토와의 1:1 세션을 주 2회로 증가할 예정입니다.',
    postType: 'lead_review',
    links: [],
    createdAt: '2026-07-31T16:00:00',
    updatedAt: '2026-07-31T16:00:00',
  },
  {
    id: 'post-4',
    authorId: 'trainee-3',
    trainingPlanId: 'tp-7',
    title: 'Spark 실습 - 대용량 로그 분석 프로젝트',
    content: '이번 주 Spark를 활용하여 10TB 규모의 서버 로그 데이터를 분석하는 실습을 진행했습니다.\n\n주요 학습 내용:\n1. RDD vs DataFrame 성능 비교\n2. 파티셔닝 전략 최적화\n3. Spark UI를 통한 작업 모니터링\n\n실습을 통해 대규모 데이터 처리의 실무 감각을 익힐 수 있었습니다.',
    postType: 'activity_log',
    links: [
      { url: 'https://spark.apache.org/docs/latest/', label: 'Apache Spark 문서' },
      { url: 'https://databricks.com/learn', label: 'Databricks Learning' },
    ],
    createdAt: '2026-07-20T11:00:00',
    updatedAt: '2026-07-20T11:00:00',
  },
  {
    id: 'post-5',
    authorId: 'trainee-5',
    trainingPlanId: 'tp-10',
    title: 'Next.js App Router 학습 - 주간 보고',
    content: 'Next.js 14의 App Router를 활용한 프론트엔드 개발을 시작했습니다.\n\nServer Components와 Client Components의 차이를 이해하고, 실제 프로젝트에 적용해 보았습니다. 서멘토님의 코드 리뷰 덕분에 빠르게 성장하고 있습니다.',
    postType: 'weekly_report',
    links: [
      { url: 'https://nextjs.org/docs', label: 'Next.js 공식 문서' },
    ],
    createdAt: '2026-07-05T10:00:00',
    updatedAt: '2026-07-05T10:00:00',
  },
  {
    id: 'post-6',
    authorId: 'trainee-4',
    trainingPlanId: 'tp-9',
    title: 'AWS VPC 구성 실습 완료',
    content: 'AWS VPC를 활용한 네트워크 구성 실습을 완료했습니다. 서브넷, 라우팅 테이블, NAT 게이트웨이 등의 개념을 직접 구성해 보며 학습했습니다.\n\n한멘토님께서 실무에서 자주 겪는 네트워크 이슈와 트러블슈팅 방법을 공유해 주셨습니다.',
    postType: 'activity_log',
    links: [],
    createdAt: '2026-07-15T13:00:00',
    updatedAt: '2026-07-15T13:00:00',
  },
];

export const comments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    authorId: 'mentor-1',
    content: '잘 정리했습니다! 다음 주 RNN 학습 시 Attention 메커니즘도 함께 살펴보면 좋겠습니다.',
    parentId: null,
    createdAt: '2026-06-22T10:30:00',
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    authorId: 'lead-1',
    content: '열심히 하고 있네요! 화이팅 💪',
    parentId: null,
    createdAt: '2026-06-22T11:00:00',
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    authorId: 'trainee-1',
    content: '감사합니다 멘토님! Attention 메커니즘 자료 미리 찾아보겠습니다.',
    parentId: 'comment-1',
    createdAt: '2026-06-22T11:30:00',
  },
  {
    id: 'comment-4',
    postId: 'post-2',
    authorId: 'lead-1',
    content: 'CI/CD 교육은 제가 직접 세션을 진행하겠습니다. 다음 주 화요일에 시간 잡아주세요.',
    parentId: null,
    createdAt: '2026-07-10T15:00:00',
  },
  {
    id: 'comment-5',
    postId: 'post-4',
    authorId: 'mentor-2',
    content: 'Spark 파티셔닝 전략을 잘 이해하고 있네요. 실무 프로젝트에서도 바로 적용할 수 있을 것 같습니다.',
    parentId: null,
    createdAt: '2026-07-20T14:00:00',
  },
  {
    id: 'comment-6',
    postId: 'post-3',
    authorId: 'admin-1',
    content: '두 분 다 잘 성장하고 있네요. 8월 중간 점검 미팅을 잡겠습니다.',
    parentId: null,
    createdAt: '2026-08-01T09:00:00',
  },
];

export const likes = [
  { id: 'like-1', postId: 'post-1', userId: 'mentor-1' },
  { id: 'like-2', postId: 'post-1', userId: 'lead-1' },
  { id: 'like-3', postId: 'post-1', userId: 'trainee-2' },
  { id: 'like-4', postId: 'post-2', userId: 'lead-1' },
  { id: 'like-5', postId: 'post-2', userId: 'trainee-1' },
  { id: 'like-6', postId: 'post-3', userId: 'admin-1' },
  { id: 'like-7', postId: 'post-3', userId: 'mentor-1' },
  { id: 'like-8', postId: 'post-3', userId: 'trainee-1' },
  { id: 'like-9', postId: 'post-3', userId: 'trainee-2' },
  { id: 'like-10', postId: 'post-4', userId: 'mentor-2' },
  { id: 'like-11', postId: 'post-4', userId: 'lead-2' },
  { id: 'like-12', postId: 'post-5', userId: 'mentor-4' },
  { id: 'like-13', postId: 'post-5', userId: 'lead-4' },
  { id: 'like-14', postId: 'post-6', userId: 'mentor-3' },
];

export const attachments = [
  {
    id: 'attach-1',
    postId: 'post-1',
    fileName: 'CNN_학습노트.pdf',
    fileUrl: '#',
    fileType: 'application/pdf',
    fileSize: 2048000,
    uploadedBy: 'trainee-1',
  },
  {
    id: 'attach-2',
    postId: 'post-4',
    fileName: 'spark_실습_코드.zip',
    fileUrl: '#',
    fileType: 'application/zip',
    fileSize: 5120000,
    uploadedBy: 'trainee-3',
  },
];

// 카테고리 한글 매핑
export const categoryLabels = {
  education: '교육',
  mentoring: '멘토링',
  team_work: '팀 업무',
  external: '외부 교육/박람회',
  adaptation: '직무 적응',
  other: '기타',
};

export const categoryColors = {
  education: '#6366f1',
  mentoring: '#8b5cf6',
  team_work: '#0ea5e9',
  external: '#f59e0b',
  adaptation: '#10b981',
  other: '#64748b',
};

export const statusLabels = {
  planned: '예정',
  in_progress: '진행중',
  completed: '완료',
  delayed: '지연',
};

export const statusColors = {
  planned: '#94a3b8',
  in_progress: '#6366f1',
  completed: '#10b981',
  delayed: '#ef4444',
};

export const postTypeLabels = {
  weekly_report: '주간 보고',
  monthly_report: '월간 보고',
  mentor_feedback: '멘토 피드백',
  lead_review: '팀장 리뷰',
  activity_log: '활동 기록',
  general: '일반',
};

export const roleLabels = {
  admin: '관리자',
  team_lead: '팀장',
  mentor: '멘토',
  trainee: '공채 사원',
};

// 헬퍼 함수들
export function getUserById(id) {
  return users.find((u) => u.id === id);
}

export function getTeamById(id) {
  return teams.find((t) => t.id === id);
}

export function getTeamMembers(teamId) {
  return users.filter((u) => u.teamId === teamId);
}

export function getMentees(mentorId) {
  return users.filter((u) => u.mentorId === mentorId);
}

export function getTrainingPlansByTrainee(traineeId) {
  return trainingPlans.filter((tp) => tp.traineeId === traineeId);
}

export function getPostsByAuthor(authorId) {
  return posts.filter((p) => p.authorId === authorId);
}

export function getCommentsByPost(postId) {
  return comments.filter((c) => c.postId === postId);
}

export function getLikesByPost(postId) {
  return likes.filter((l) => l.postId === postId);
}

export function getAttachmentsByPost(postId) {
  return attachments.filter((a) => a.postId === postId);
}

export function getPostById(postId) {
  return posts.find((p) => p.id === postId);
}

export function getTrainingPlanById(id) {
  return trainingPlans.find((tp) => tp.id === id);
}
