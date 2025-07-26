// Mock data para el desarrollo inicial
export const mockSucculents = [
  {
    id: 1,
    name: "Echeveria Purple Pearl",
    description: "Suculenta con hojas carnosas de color púrpura intenso, perfecta para interiores.",
    care: "Riego moderado cada 7-10 días. Luz indirecta brillante. Drenaje excelente.",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
    category: "Echeveria",
    difficulty: "Fácil"
  },
  {
    id: 2,
    name: "Crassula Jade Green",
    description: "Árbol de jade con hojas verdes brillantes, símbolo de prosperidad.",
    care: "Riego escaso cada 10-14 días. Luz solar directa. Suelo bien drenado.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    category: "Crassula",
    difficulty: "Muy Fácil"
  },
  {
    id: 3,
    name: "Haworthia Zebra",
    description: "Suculenta con rayas blancas distintivas, ideal para principiantes.",
    care: "Riego moderado cada 8-12 días. Luz indirecta. Proteger del sol directo.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Haworthia",
    difficulty: "Fácil"
  },
  {
    id: 4,
    name: "Sedum Rosette Pink",
    description: "Roseta perfecta con tonos rosados, muy resistente y decorativa.",
    care: "Riego bajo cada 10-15 días. Luz solar parcial. Resistente al frío.",
    image: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=400&h=400&fit=crop",
    category: "Sedum",
    difficulty: "Muy Fácil"
  },
  {
    id: 5,
    name: "Aloe Vera Healing",
    description: "Clásica planta medicinal con propiedades curativas naturales.",
    care: "Riego escaso cada 12-18 días. Luz brillante. Suelo arenoso.",
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=400&fit=crop",
    category: "Aloe",
    difficulty: "Fácil"
  },
  {
    id: 6,
    name: "Lithops Living Stone",
    description: "Piedra viviente que imita rocas del desierto, muy exótica.",
    care: "Riego muy escaso cada 20-30 días. Luz solar directa. Reposo invernal.",
    image: "https://images.unsplash.com/photo-1558603668-6570496b66f8?w=400&h=400&fit=crop",
    category: "Lithops",
    difficulty: "Avanzado"
  }
];

export const mockPricing = {
  small: {
    1: 250,
    2: 400,
    3: 500
  },
  medium: {
    1: 450,
    2: 800,
    3: 1100
  }
};

export const mockBrandAssets = {
  logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
  banner: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=300&fit=crop",
  brandName: "Otro Mundo",
  tagline: "Suculentas que transforman espacios"
};

export const mockSocialContent = [
  {
    id: 1,
    type: "flyer",
    title: "Promoción Especial - 3x2 en Suculentas",
    description: "Oferta limitada para renovar tu hogar",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&h=600&fit=crop",
    platform: "instagram",
    status: "generated"
  },
  {
    id: 2,
    type: "reel",
    title: "Cuidados Básicos - Tutorial Rápido",
    description: "Tips esenciales para mantener tus suculentas",
    image: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=600&h=600&fit=crop",
    platform: "instagram",
    status: "draft"
  },
  {
    id: 3,
    type: "story",
    title: "Nuevas Llegadas - Colección Exótica",
    description: "Descubre variedades únicas",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
    platform: "facebook",
    status: "published"
  }
];

export const succulentColors = {
  primary: {
    green: "#2D5016",
    lightGreen: "#4A7C59",
    sage: "#68A357"
  },
  secondary: {
    coral: "#C7522A",
    pink: "#E5989B",
    dustyRose: "#B5838D"
  },
  accent: {
    purple: "#6F2DBD",
    lavender: "#A663CC",
    lilac: "#B19CD9"
  },
  neutral: {
    earthBrown: "#8B4513",
    terracotta: "#D2691E",
    sand: "#F4A460"
  }
};