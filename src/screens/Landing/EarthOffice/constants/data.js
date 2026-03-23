// ============================================
// Earth Office CRM — Static Data Constants
// ============================================

export const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Add-ons', id: 'addons' },
  { label: 'Contact', id: 'contact' },
];

export const FEATURES = [
  {
    id: 1,
    icon: '👥',
    title: 'Contacts Management',
    description:
      'Centralise all your clients, partners, and leads in one intelligent hub. Sync across devices, search instantly, and never lose a connection again.',
    color: 'from-sky-400 to-blue-600',
    glow: 'rgba(0, 158, 221, 0.3)',
  },
  {
    id: 2,
    icon: '🔥',
    title: 'Deals Tracking',
    description:
      'Visualise your entire sales pipeline at a glance. Move deals through stages, set reminders, and close faster with AI-powered insights.',
    color: 'from-orange-400 to-rose-500',
    glow: 'rgba(251, 113, 59, 0.3)',
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Leads Management',
    description:
      'Capture, qualify, and nurture leads automatically. Score prospects intelligently so your team always focuses on the highest-value opportunities.',
    color: 'from-violet-500 to-purple-700',
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    id: 4,
    icon: '🏢',
    title: 'Organization Users',
    description:
      'Manage roles, permissions, and teams with ease. From individual contributors to entire departments — everyone gets exactly the access they need.',
    color: 'from-emerald-400 to-teal-600',
    glow: 'rgba(52, 211, 153, 0.3)',
  },
];

export const ADDONS = [
  {
    id: 1,
    icon: '🤖',
    title: 'Deal Match AI',
    description: 'Automated email drafts, deal summaries & next-step suggestions powered by GPT.',
    badge: 'Free',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 2,
    icon: '📊',
    title: 'Virtual Office',
    description: 'Predictive revenue forecasting, churn detection, and lead-scoring with deep ML models.',
    badge: 'Pro',
    badgeColor: 'bg-[#009edd]',
  },
  {
    id: 3,
    icon: '✍️',
    title: 'Maximus Content',
    description: 'Generate landing page copy, email sequences, and ad creatives in seconds.',
    badge: 'Pro',
    badgeColor: 'bg-[#009edd]',
  },
  {
    id: 4,
    icon: '🔔',
    title: 'Super Dev',
    description: 'Trigger workflows, follow-ups, and notifications based on CRM behaviour — automatically.',
    badge: 'Free',
    badgeColor: 'bg-emerald-500',
  },
];

export const ROLE_FEATURES = {
  individual: [
    { icon: '📁', text: 'Personal contact & deal board' },
    { icon: '📧', text: 'Unlimited email templates' },
    { icon: '🗓️', text: 'Task & calendar reminders' },
    { icon: '📈', text: 'Personal performance dashboard' },
    { icon: '🔒', text: 'Private data workspace' },
    { icon: '🌐', text: 'Landing page builder' },
  ],
  organization: [
    { icon: '👥', text: 'Multi-user collaboration' },
    { icon: '🛡️', text: 'Role-based access control' },
    { icon: '📊', text: 'Team performance reports' },
    { icon: '🔗', text: 'CRM + ERP integrations' },
    { icon: '⚙️', text: 'Custom pipelines & workflows' },
    { icon: '🌐', text: 'Landing page builder' },
  ],
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sophia Martínez',
    role: 'Head of Sales, NovaTech',
    avatar: 'SM',
    avatarBg: 'from-pink-400 to-rose-500',
    review:
      'Earth Office completely transformed how our team manages deals. The pipeline view is beautiful, and the AI insights have boosted our close rate by over 30%.',
    stars: 5,
  },
  {
    id: 2,
    name: 'James Okafor',
    role: 'Founder, Buildr Agency',
    avatar: 'JO',
    avatarBg: 'from-sky-400 to-blue-600',
    review:
      'We replaced three separate tools with Earth Office. The landing page builder alone saves us 10+ hours a week. Absolutely game-changing for a small team.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Marketing Director, Kovalent',
    avatar: 'PN',
    avatarBg: 'from-violet-500 to-purple-700',
    review:
      'The email template builder is gorgeous. Our open rates are up 40% since switching. The design quality and ease of use are unmatched.',
    stars: 5,
  },
  {
    id: 4,
    name: 'Luca Ferrari',
    role: 'CTO, Syncly.io',
    avatar: 'LF',
    avatarBg: 'from-emerald-400 to-teal-600',
    review: 'Integration was seamless. Earth Office\'s API is clean and the developer docs are excellent. We were live in 2 hours. Rarely seen this level of polish.',
    stars: 5,
  },
];

export const PRICING_PLANS = [
  {
    id: 1,
    name: 'Starter',
    price: '$0',
    period: '/month',
    desc: 'Perfect for individuals getting started.',
    features: [
      '1 User',
      'Up to 500 Contacts',
      '1 Active Pipeline',
      '5 Email Templates',
      'Basic AI Assistant',
      'Community Support',
    ],
    cta: 'Start Free',
    popular: false,
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
  },
  {
    id: 2,
    name: 'Growth',
    price: '$29',
    period: '/month',
    desc: 'Ideal for growing teams and agencies.',
    features: [
      'Up to 10 Users',
      'Unlimited Contacts',
      'Unlimited Pipelines',
      'Unlimited Templates',
      'AI Analytics + Writer',
      'Priority Support',
      'Landing Page Builder',
      'Custom Automations',
    ],
    cta: 'Get Started',
    popular: true,
    gradient: 'from-[#009edd] to-blue-700',
    border: 'border-[#009edd]/50',
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    desc: 'For large organizations needing full control.',
    features: [
      'Unlimited Users',
      'Unlimited Everything',
      'Advanced Role Permissions',
      'Custom CRM Fields',
      'Dedicated Account Manager',
      'SLA Support',
      'Custom Integrations',
      'Data Export & API Access',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-slate-800 to-slate-900',
    border: 'border-white/10',
  },
];
