import fs from 'node:fs/promises';
import path from 'node:path';
import { sql } from './db';

export const defaultHomepage = {
  hero: {
    eyebrow: 'African Center for Science and International Security',
    title: 'Science for Peace, Security for Progress',
    lead: 'AFRICSIS supports resilient institutions, informed policy, and public trust through research, dialogue, and leadership in science and international security.',
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

export const defaultNews = [
  {
    id: 'news-1',
    title: 'Advancing nuclear security and energy resilience across Africa',
    category: 'Nuclear Security',
    summary: 'Exploring how secure, resilient energy systems can support development, stability, and long-term public trust.',
    date: '2026-11-01',
  },
];

export const defaultEvents = [
  {
    id: 'event-1',
    title: 'AFRICSIS Policy Forum',
    date: '2026-12-15',
    location: 'Accra, Ghana',
    description: 'A strategic convening of researchers, policymakers, and regional stakeholders to discuss resilience and science-led security policy.',
  },
];

const dataFilePath = path.join(process.cwd(), 'data', 'africsis-admin.json');

async function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ homepage: defaultHomepage, news: defaultNews, events: defaultEvents }, null, 2),
      'utf8'
    );
  }
}

async function readDataFile() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return { homepage: defaultHomepage, news: defaultNews, events: defaultEvents };
  }
}

async function persistDataFile(payload) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(payload, null, 2), 'utf8');
}

async function ensureNeonTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_content (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

async function getNeonData() {
  try {
    await ensureNeonTable();
    const rows = await sql`
      SELECT key, value
      FROM admin_content
      WHERE key IN ('homepage', 'news', 'events')
    `;

    if (!rows || rows.length === 0) {
      const seed = {
        homepage: defaultHomepage,
        news: defaultNews,
        events: defaultEvents,
      };

      const legacyRows = await sql`
        SELECT value FROM site_content WHERE key = 'home' LIMIT 1
      `.catch(() => []);
      if (legacyRows?.[0]?.value) {
        seed.homepage = legacyRows[0].value;
      }

      await sql`
        INSERT INTO admin_content (key, value)
        VALUES ('homepage', ${JSON.stringify(seed.homepage)}::jsonb),
               ('news', ${JSON.stringify(seed.news)}::jsonb),
               ('events', ${JSON.stringify(seed.events)}::jsonb)
        ON CONFLICT (key) DO NOTHING
      `;

      return seed;
    }

    const result = { homepage: defaultHomepage, news: defaultNews, events: defaultEvents };
    for (const row of rows) {
      if (!row?.value) continue;
      const key = row.key;
      if (key === 'homepage') result.homepage = row.value;
      if (key === 'news') result.news = row.value;
      if (key === 'events') result.events = row.value;
    }

    return result;
  } catch {
    return null;
  }
}

export async function getAdminData() {
  const fromNeon = await getNeonData();
  if (fromNeon) {
    return fromNeon;
  }

  return readDataFile();
}

export async function saveAdminData(nextData) {
  const merged = {
    homepage: nextData.homepage || defaultHomepage,
    news: nextData.news || defaultNews,
    events: nextData.events || defaultEvents,
  };

  try {
    await ensureNeonTable();
    await sql`
      INSERT INTO admin_content (key, value)
      VALUES ('homepage', ${JSON.stringify(merged.homepage)}::jsonb),
             ('news', ${JSON.stringify(merged.news)}::jsonb),
             ('events', ${JSON.stringify(merged.events)}::jsonb)
      ON CONFLICT (key) DO UPDATE
      SET value = EXCLUDED.value,
          updated_at = NOW()
    `;
    return merged;
  } catch {
    await persistDataFile(merged);
    return merged;
  }
}
