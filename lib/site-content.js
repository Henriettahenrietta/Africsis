import { getAdminData } from './admin-store';

export const fallbackContent = {
  hero: {
    eyebrow: 'African Center for Science and International Security',
    title: 'Science for Peace, Security for Progress',
    lead:
      'AFRICSIS supports resilient institutions, informed policy, and public trust through research, dialogue, and leadership in science and international security.',
  },
  stats: [
    { value: '15+', label: 'Years of engagement' },
    { value: '30', label: 'Countries engaged' },
    { value: '50+', label: 'Initiatives supported' },
  ],
  programs: [
    {
      label: 'NSP',
      title: 'Nuclear Security Program',
      text: 'Strengthening institutional, technical, and policy capacity for the protection of nuclear and radiological materials.',
    },
    {
      label: 'NDP',
      title: 'Nonproliferation & Disarmament',
      text: 'Promoting regional literacy and international dialogue on peace, security, and responsible nuclear governance.',
    },
    {
      label: 'SVP',
      title: 'Safeguards & Verification',
      text: 'Supporting verification systems, compliance frameworks, and confidence-building pathways for safer systems.',
    },
    {
      label: 'POL',
      title: 'Policy & Leadership',
      text: 'Translating science into strategic direction and informed leadership for government and institutional action.',
    },
    {
      label: 'CAP',
      title: 'Capacity Building',
      text: 'Empowering researchers, policymakers, and communities through training, mentorship, and engagement.',
    },
    {
      label: 'PUB',
      title: 'Public Engagement',
      text: 'Building trust through transparency, communication, and deeper public understanding of science and security.',
    },
  ],
  engagements: [
    'Nuclear safety and security policy intelligence',
    'Regional stakeholder mobilization and diplomacy',
    'Evidence-based research and strategic briefings',
    'Youth and institutional capacity development',
  ],
  leadership: [
    {
      name: 'Secure4Med side event',
      title: 'Nuclear security for medical facilities',
      bio: 'AFRICSIS representatives joined international partners for a Secure4Med side event focused on the security of medical facilities.',
      image: '/images/president-1.jpeg',
    },
    {
      name: 'ISTC 30th Anniversary',
      title: 'Science for a Safer World',
      bio: 'AFRICSIS participated in the ISTC 30th Anniversary conference on June 6, 2024.',
      image: '/images/meeting-team.jpeg',
    },
    {
      name: 'Regional policy dialogue',
      title: 'Science and security engagement',
      bio: 'Researchers and policy stakeholders share perspectives during a regional science and security engagement.',
      image: '/images/conference-panel.jpeg',
    },
  ],
  insights: [
    {
      category: 'Nuclear Security',
      title: 'Advancing nuclear security and energy resilience across Africa',
      summary: 'Exploring how secure, resilient energy systems can support development, stability, and long-term public trust.',
      image: '/images/conference-banner.jpeg',
    },
    {
      category: 'Stakeholder Engagement',
      title: 'Building trust through meaningful scientific and policy dialogue',
      summary: 'The role of inclusive communication in strengthening public confidence and institutional legitimacy.',
      image: '/images/meeting-team.jpeg',
    },
    {
      category: 'Policy',
      title: 'What responsible innovation means for African development',
      summary: 'A strategic view on how science and governance can align to create practical, secure futures.',
      image: '/images/conference-panel.jpeg',
    },
  ],
  cta: {
    title: 'Help build a safer and more secure future.',
    button: 'Support AFRICSIS',
  },
  contact: {
    heading: 'Let’s work together for meaningful impact.',
    list: [
      'Research collaboration',
      'Institutional partnerships',
      'Training and capacity building',
      'Strategic advisory support',
    ],
  },
};

export async function getSiteContent() {
  try {
    const data = await getAdminData();
    const homepage = data?.homepage || fallbackContent;

    return {
      ...homepage,
      source: 'database',
    };
  } catch (error) {
    console.error('Unable to read AFRICSIS content from Neon. Falling back to local content.', error);
    return { ...fallbackContent, source: 'fallback' };
  }
}
