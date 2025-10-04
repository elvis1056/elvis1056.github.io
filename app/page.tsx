'use client';

import Banner from '@/components/Banner';
import SkillsSection from '@/components/SkillsSection';
import { skillsData } from '@/constants/skills';

export default function Home() {
  return (
    <main>
      <Banner />
      <SkillsSection
        title={skillsData.title}
        categories={skillsData.categories}
      />
    </main>
  );
}
