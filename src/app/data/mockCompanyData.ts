import type { Service, SeamstressProfile, ApplicationWithSeamstress } from '../types';

// Mock Jobs posted by the company
export const mockCompanyJobs: (Service & { applicantsCount: number, status: 'open' | 'closed' })[] = [
  {
    id: 'job-1',
    title: 'Confecção de Uniformes Escolares',
    description: 'Precisamos de costureiras para confecção de 500 unidades de uniformes escolares. Fornecemos o tecido e os moldes.',
    shortDescription: 'Confecção de 500 uniformes escolares com material fornecido.',
    price: 3500,
    deadline: 15,
    city: 'São Paulo',
    state: 'SP',
    category: 'Malharia',
    contractType: 'Empreitada',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    featured: true,
    urgent: false,
    company: {
      id: 'comp-1',
      name: 'Confecções Silva',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
    },
    applicantsCount: 12,
    status: 'open'
  },
  {
    id: 'job-2',
    title: 'Costureira para Ateliê de Alta Costura',
    description: 'Vaga para costureira com experiência em vestidos de festa e noiva. Trabalho presencial no bairro Jardins.',
    shortDescription: 'Costureira com experiência em alta costura para ateliê.',
    price: 4500,
    deadline: 30,
    city: 'São Paulo',
    state: 'SP',
    category: 'Alta Costura',
    contractType: 'CLT',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    featured: false,
    urgent: true,
    company: {
      id: 'comp-1',
      name: 'Confecções Silva',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
    },
    applicantsCount: 5,
    status: 'open'
  },
  {
    id: 'job-3',
    title: 'Ajustes em Lote de Calças Jeans',
    description: 'Necessitamos de ajuste de bainha em 200 calças jeans. Urgente.',
    shortDescription: 'Ajuste de bainha em 200 calças jeans.',
    price: 1200,
    deadline: 5,
    city: 'São Paulo',
    state: 'SP',
    category: 'Ajustes',
    contractType: 'Freelance',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    featured: false,
    urgent: true,
    company: {
      id: 'comp-1',
      name: 'Confecções Silva',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
    },
    applicantsCount: 3,
    status: 'closed'
  }
];

// Mock Candidates
export const mockCandidates: Record<string, ApplicationWithSeamstress[]> = {
  'job-1': [
    {
      id: 'app-1',
      serviceId: 'job-1',
      seamstressId: 'seam-1',
      status: 'pending',
      message: 'Tenho experiência com uniformes, já trabalhei na fábrica da Têxtil ABC.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      seamstress: {
        id: 'seam-1',
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        role: 'seamstress',
        coins: 50,
        city: 'São Paulo',
        state: 'SP',
        bio: 'Costureira com 15 anos de experiência em malharia e uniformes.',
        specialties: ['Malharia', 'Uniformes', 'Overlock'],
        portfolio: [
          'https://images.unsplash.com/photo-1598209279122-8541213a0379?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop'
        ],
        rating: 4.8,
        completedJobs: 124,
        yearsExperience: 15,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
      }
    },
    {
      id: 'app-2',
      serviceId: 'job-1',
      seamstressId: 'seam-2',
      status: 'accepted',
      message: 'Tenho maquinário próprio e disponibilidade imediata.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      seamstress: {
        id: 'seam-2',
        name: 'Ana Santos',
        email: 'ana@email.com',
        role: 'seamstress',
        coins: 120,
        city: 'Osasco',
        state: 'SP',
        bio: 'Especialista em produção em escala.',
        specialties: ['Produção', 'Reta', 'Interlock'],
        portfolio: [
          'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=400&h=300&fit=crop'
        ],
        rating: 4.5,
        completedJobs: 89,
        yearsExperience: 8,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      }
    },
    {
      id: 'app-3',
      serviceId: 'job-1',
      seamstressId: 'seam-3',
      status: 'rejected',
      message: 'Gostaria de saber mais sobre o prazo.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      seamstress: {
        id: 'seam-3',
        name: 'Carla Dias',
        email: 'carla@email.com',
        role: 'seamstress',
        coins: 10,
        city: 'Guarulhos',
        state: 'SP',
        bio: 'Iniciando na área de confecção.',
        specialties: ['Costura Reta'],
        portfolio: [],
        rating: 4.0,
        completedJobs: 5,
        yearsExperience: 1,
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop'
      }
    }
  ],
  'job-2': [
    {
      id: 'app-4',
      serviceId: 'job-2',
      seamstressId: 'seam-4',
      status: 'pending',
      message: 'Tenho curso de alta costura no SENAI e experiência em ateliês renomados.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      seamstress: {
        id: 'seam-4',
        name: 'Julia Roberts',
        email: 'julia@email.com',
        role: 'seamstress',
        coins: 200,
        city: 'São Paulo',
        state: 'SP',
        bio: 'Alta costura é minha paixão. Acabamentos impecáveis.',
        specialties: ['Alta Costura', 'Bordado', 'Moulage'],
        portfolio: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=300&fit=crop'
        ],
        rating: 5.0,
        completedJobs: 42,
        yearsExperience: 12,
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
      }
    }
  ]
};
