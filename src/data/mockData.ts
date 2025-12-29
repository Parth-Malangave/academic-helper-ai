export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isGroup: boolean;
}

export interface CommunityDoubt {
  id: string;
  topic: string;
  doubt: string;
  author: string;
  timestamp: Date;
  answersCount: number;
  imageUrl?: string;
}

export interface Answer {
  id: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  timestamp: Date;
}

export interface Contributor {
  id: string;
  name: string;
  doubtsResolved: number;
  avatar: string;
}

export const mockChatHistory: ChatThread[] = [
  { id: '1', title: 'Quantum Mechanics Basics', lastMessage: 'Can you explain wave-particle duality?', timestamp: new Date('2024-01-15'), isGroup: false },
  { id: '2', title: 'Calculus Integration', lastMessage: 'How to solve integration by parts?', timestamp: new Date('2024-01-14'), isGroup: false },
  { id: '3', title: 'Organic Chemistry Reactions', lastMessage: 'Explain SN1 vs SN2 mechanisms', timestamp: new Date('2024-01-13'), isGroup: false },
  { id: '4', title: 'Physics Study Group', lastMessage: 'Let\'s discuss electromagnetism', timestamp: new Date('2024-01-12'), isGroup: true },
  { id: '5', title: 'Math Club', lastMessage: 'Topology problem set', timestamp: new Date('2024-01-11'), isGroup: true },
  { id: '6', title: 'Linear Algebra Help', lastMessage: 'Eigenvalues and eigenvectors', timestamp: new Date('2024-01-10'), isGroup: false },
];

export const mockMessages: ChatMessage[] = [
  { id: '1', content: 'Can you explain what wave-particle duality means in quantum mechanics?', sender: 'user', timestamp: new Date('2024-01-15T10:00:00') },
  { id: '2', content: 'Wave-particle duality is a fundamental concept in quantum mechanics that describes how every particle or quantum entity may be described as either a particle or a wave. It expresses the inability of classical concepts like "particle" or "wave" to fully describe the behavior of quantum-scale objects.\n\nKey points:\n\n1. **Light behaves as both**: Light can exhibit wave-like behavior (interference, diffraction) and particle-like behavior (photoelectric effect).\n\n2. **Matter waves**: Louis de Broglie proposed that matter also exhibits wave-like properties, with wavelength λ = h/p, where h is Planck\'s constant and p is momentum.\n\n3. **Double-slit experiment**: This famous experiment demonstrates both properties - particles create an interference pattern (wave behavior) but are detected as individual particles.\n\nWould you like me to explain any of these concepts in more detail?', sender: 'ai', timestamp: new Date('2024-01-15T10:01:00') },
  { id: '3', content: 'Yes, can you explain the double-slit experiment more?', sender: 'user', timestamp: new Date('2024-01-15T10:02:00') },
  { id: '4', content: 'The double-slit experiment is one of the most famous experiments in physics. Here\'s how it works:\n\n**Setup:**\n- A light source (or particle emitter) faces a barrier with two narrow slits\n- Behind the barrier is a detection screen\n\n**Classical expectation:**\n- Particles should pass through one slit or the other, creating two bands on the screen\n\n**Actual result:**\n- An interference pattern of light and dark bands appears\n- This pattern is characteristic of waves interfering with each other\n\n**The mystery:**\n- Even when particles are sent one at a time, the interference pattern still builds up over time\n- But if you try to observe which slit the particle goes through, the pattern disappears!\n\nThis demonstrates that observation affects quantum behavior, and particles truly exhibit wave properties until measured.', sender: 'ai', timestamp: new Date('2024-01-15T10:03:00') },
];

export const mockCommunityDoubts: CommunityDoubt[] = [
  { id: '1', topic: 'Thermodynamics', doubt: 'Can someone explain the difference between isothermal and adiabatic processes with real-world examples?', author: 'PhysicsNerd', timestamp: new Date('2024-01-15'), answersCount: 5 },
  { id: '2', topic: 'Organic Chemistry', doubt: 'I\'m confused about the mechanism of Friedel-Crafts alkylation. Can someone break it down step by step?', author: 'ChemStudent', timestamp: new Date('2024-01-14'), answersCount: 3 },
  { id: '3', topic: 'Linear Algebra', doubt: 'What\'s the geometric interpretation of matrix determinants? I understand the calculation but not the meaning.', author: 'MathLover', timestamp: new Date('2024-01-14'), answersCount: 7 },
  { id: '4', topic: 'Biology', doubt: 'How does CRISPR-Cas9 actually edit genes? I need a simplified explanation for my presentation.', author: 'BioMajor', timestamp: new Date('2024-01-13'), answersCount: 4 },
  { id: '5', topic: 'Calculus', doubt: 'When should I use L\'Hôpital\'s rule vs. algebraic manipulation for limits?', author: 'CalcNewbie', timestamp: new Date('2024-01-13'), answersCount: 6 },
  { id: '6', topic: 'Physics', doubt: 'Can someone explain why we can\'t exceed the speed of light using simple terms?', author: 'CuriousMind', timestamp: new Date('2024-01-12'), answersCount: 8 },
  { id: '7', topic: 'Statistics', doubt: 'What\'s the difference between Type I and Type II errors in hypothesis testing?', author: 'StatStudent', timestamp: new Date('2024-01-12'), answersCount: 5 },
  { id: '8', topic: 'Computer Science', doubt: 'How does recursion work in terms of memory allocation on the call stack?', author: 'CodeLearner', timestamp: new Date('2024-01-11'), answersCount: 4 },
  { id: '9', topic: 'Chemistry', doubt: 'Why do some reactions require catalysts while others don\'t?', author: 'ChemCurious', timestamp: new Date('2024-01-11'), answersCount: 3 },
  { id: '10', topic: 'Mathematics', doubt: 'Can someone explain the intuition behind the Fourier Transform?', author: 'SignalSeeker', timestamp: new Date('2024-01-10'), answersCount: 9 },
];

export const mockAnswers: Answer[] = [
  { id: '1', content: 'Great question! In an isothermal process, temperature remains constant (think of a gas expanding slowly in a cylinder surrounded by a heat bath). In an adiabatic process, no heat is exchanged with surroundings (like rapid compression in a diesel engine). The key difference is that isothermal requires heat exchange to maintain temperature, while adiabatic is perfectly insulated.', author: 'Prof_Physics', upvotes: 15, downvotes: 1, timestamp: new Date('2024-01-15') },
  { id: '2', content: 'To add a real-world example: When you use a bicycle pump and feel it getting warm, that\'s an adiabatic process - the air is compressed quickly without time to exchange heat. An isothermal example would be slow inflation where the pump stays at room temperature.', author: 'ThermoDynamo', upvotes: 12, downvotes: 0, timestamp: new Date('2024-01-15') },
  { id: '3', content: 'Remember the formulas too: For isothermal (ideal gas): PV = constant. For adiabatic: PV^γ = constant, where γ is the heat capacity ratio.', author: 'MathPhysics', upvotes: 8, downvotes: 2, timestamp: new Date('2024-01-15') },
];

export const mockContributors: Contributor[] = [
  { id: '1', name: 'Prof_Physics', doubtsResolved: 47, avatar: 'PP' },
  { id: '2', name: 'MathWizard', doubtsResolved: 38, avatar: 'MW' },
  { id: '3', name: 'ChemExpert', doubtsResolved: 32, avatar: 'CE' },
  { id: '4', name: 'BioHelper', doubtsResolved: 28, avatar: 'BH' },
  { id: '5', name: 'CodeMaster', doubtsResolved: 24, avatar: 'CM' },
];

export const myDoubtsSolved = [
  { id: '1', topic: 'Calculus', doubt: 'Integration by substitution method' },
  { id: '2', topic: 'Physics', doubt: 'Newton\'s laws application' },
  { id: '3', topic: 'Chemistry', doubt: 'Balancing redox equations' },
];

export const myDoubtsAsked = [
  { id: '1', topic: 'Linear Algebra', doubt: 'Matrix diagonalization steps' },
  { id: '2', topic: 'Statistics', doubt: 'Confidence interval calculation' },
];

export const userProfile = {
  name: 'Alex Johnson',
  avatar: 'AJ',
  stars: 156,
  badges: ['🏆 Top Contributor', '📚 Knowledge Seeker', '🌟 Rising Star', '💡 Problem Solver'],
};
