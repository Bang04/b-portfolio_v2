import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { registerPdfFonts, PDF_FONT_FAMILY } from './fonts'
import { profile, featuredProject, projects, experiences } from '@/data/portfolioData'

registerPdfFonts()

/* ---------------------------------------------------------------------------
 * 색상 — src/index.css의 @theme 토큰(accent, zinc)을 그대로 hex로 옮겨둔다.
 * react-pdf는 CSS 변수를 읽지 못해 값을 직접 복사해야 한다.
 * ------------------------------------------------------------------------- */
const color = {
  ink: '#18181b', // zinc-900
  body: '#3f3f46', // zinc-700
  muted: '#71717a', // zinc-500
  faint: '#a1a1aa', // zinc-400
  line: '#e4e4e7', // zinc-200
  surface: '#f4f4f5', // zinc-100
  accent: '#4f46e5', // accent-600
  accentSoft: '#eef2ff', // accent-50
}

const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 9,
    lineHeight: 1.5,
    color: color.body,
    paddingTop: 30,
    paddingBottom: 34,
    paddingHorizontal: 38,
  },
  h1: { fontSize: 18, fontWeight: 700, color: color.ink },
  h2: {
    fontSize: 11,
    fontWeight: 700,
    color: color.ink,
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  h2First: { marginTop: 0 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaText: { fontSize: 8.5, color: color.muted },
  link: { color: color.accent, textDecoration: 'none' },
  row: { flexDirection: 'row' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statValue: { fontSize: 14, fontWeight: 700, color: color.ink },
  statLabel: { fontSize: 8, color: color.muted, marginTop: 2 },
  keyword: {
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 7,
    marginRight: 6,
    marginBottom: 6,
  },
  keywordLabel: { fontSize: 8.5, fontWeight: 600, color: color.ink },
  keywordProof: { fontSize: 8, color: color.accent, marginTop: 1 },
  introItem: {
    borderLeftWidth: 2,
    borderLeftColor: color.line,
    paddingLeft: 8,
    marginBottom: 6,
    fontSize: 8.7,
    lineHeight: 1.5,
  },
  principleTitle: { fontSize: 9, fontWeight: 600, color: color.ink },
  principleEvidence: { fontSize: 8, color: color.accent },
  paragraph: { fontSize: 8.7, lineHeight: 1.55, color: color.body },
  techRow: { flexDirection: 'row', marginBottom: 2 },
  techCategory: { width: 88, fontSize: 8.5, fontWeight: 600, color: color.ink },
  techSkills: { flex: 1, fontSize: 8.5, color: color.body },
  outcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  outcomeLabel: { fontSize: 8.7, color: color.body },
  outcomeValue: { fontSize: 8.7, fontWeight: 600, color: color.accent },
  deepDiveCard: {
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  deepDiveHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  deepDiveTag: {
    fontSize: 6.5,
    fontWeight: 600,
    color: color.accent,
    backgroundColor: color.accentSoft,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  deepDiveTitle: { fontSize: 8.8, fontWeight: 600, color: color.ink, flex: 1 },
  deepDiveMetric: { fontSize: 8.2, color: color.body, marginTop: 2 },
  expEntry: { marginBottom: 8 },
  expHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  expOrg: { fontSize: 9, fontWeight: 700, color: color.ink },
  expTitle: { fontSize: 8.5, color: color.muted, marginTop: 1 },
  expPeriod: { fontSize: 8, color: color.faint },
  achievement: { fontSize: 8.3, color: color.body, marginTop: 3, paddingLeft: 8 },
  otherProjectRow: { marginBottom: 7 },
  otherProjectTitle: { fontSize: 9, fontWeight: 600, color: color.ink },
  otherProjectMeta: { fontSize: 8, color: color.faint, marginTop: 1 },
  otherProjectHighlight: { fontSize: 8.3, color: color.body, marginTop: 2 },
  footerNote: { fontSize: 8, color: color.muted, marginTop: 3 },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 38,
    right: 38,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: color.line,
    paddingTop: 6,
  },
  footerPage: {
    fontSize: 7.5,
    color: color.faint,
  },
})

/* ---------------------------------------------------------------------------
 * 딥다이브 → 핵심 수치 한 줄
 * ---------------------------------------------------------------------------
 * metric이 있으면 그대로 쓰고, 없는 딥다이브(dd-single-source)는 같은 사건을
 * 가리키는 result.outcomes 항목의 value를 대신 쓴다 — 새 문장을 짓지 않고
 * 기존 데이터를 재사용한다.
 * ------------------------------------------------------------------------- */
const DEEP_DIVE_OUTCOME_FALLBACK: Record<string, string> = {
  'dd-single-source': 'out-single-source',
}

/**
 * portfolioData.ts는 계속 자라는 데이터다 — 딥다이브가 5개, 7개로 늘어도
 * 3장 예산은 고정이다. 그래서 전부 나열하지 않고 개수를 고정 상한으로
 * 자르고, 남는 개수는 웹사이트로 유도하는 한 줄로만 알린다.
 */
const MAX_DEEP_DIVES_IN_PDF = 4

function deepDiveMetricText(deepDive: (typeof featuredProject.deepDives)[number]) {
  if (deepDive.metric) {
    return `${deepDive.metric.before} → ${deepDive.metric.after}`
  }
  const fallbackId = DEEP_DIVE_OUTCOME_FALLBACK[deepDive.id]
  const outcome = featuredProject.result.outcomes.find((o) => o.id === fallbackId)
  return outcome?.value ?? ''
}

function formatPeriod(start: string, end?: string) {
  return `${start} – ${end ?? '현재'}`
}

/**
 * react-pdf의 <Text render={...} fixed> (페이지 번호 자동 계산) 조합이
 * 이 문서 구조에서 해당 View 전체를 그리지 않게 만드는 버그가 있어(재현
 * 확인됨 — render prop을 정적 문자열로 바꾸면 즉시 해결), 페이지 번호를
 * 런타임 계산 대신 각 <Page>가 자신의 순서를 prop으로 넘기는 방식으로 우회한다.
 * 3장 고정 설계이므로 정적 라벨로 충분하다.
 */
function Footer({ pageLabel }: { pageLabel: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerPage}>{pageLabel}</Text>
    </View>
  )
}

export function PortfolioPdfDocument() {
  const workExperiences = experiences.filter((exp) => exp.kind === 'work')
  const otherEntries = experiences.filter((exp) => exp.kind !== 'work')
  const highlightedProjects = projects.filter((p) =>
    ['solar-river-monitoring', 'remp-monitoring-renewal'].includes(p.id),
  )
  const remainingProjectCount = projects.length - highlightedProjects.length
  const shownDeepDives = featuredProject.deepDives.slice(0, MAX_DEEP_DIVES_IN_PDF)
  const remainingDeepDiveCount = featuredProject.deepDives.length - shownDeepDives.length
  const scopeLimits = featuredProject.limits.filter((l) => l.kind === 'scope')
  const unfinishedLimits = featuredProject.limits.filter((l) => l.kind === 'unfinished')

  return (
    <Document
      title={`${profile.nameEn} 포트폴리오 요약`}
      author={profile.nameEn}
      subject="Frontend Engineer Portfolio Summary"
    >
      {/* ================= 1장 — 프로필 & 핵심 요약 ================= */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{profile.nameEn}</Text>
        <View style={[styles.metaRow, { marginTop: 4 }]}>
          <Text style={styles.metaText}>{profile.role}</Text>
          <Text style={styles.metaText}>·</Text>
          <Text style={styles.metaText}>{profile.location}</Text>
          <Text style={styles.metaText}>·</Text>
          <Link src={`mailto:${profile.email}`} style={[styles.link, styles.metaText]}>
            {profile.email}
          </Link>
          {profile.socials
            .filter((s) => s.platform !== 'email')
            .map((social) => (
              <Text key={social.platform} style={styles.metaText}>
                ·{' '}
                <Link src={social.url} style={styles.link}>
                  {social.label}
                </Link>
              </Text>
            ))}
        </View>

        <Text style={[styles.h1, { fontSize: 15, marginTop: 18 }]}>
          {profile.headline.join('  ')}
        </Text>
        <Text style={[styles.paragraph, { marginTop: 6 }]}>{profile.oneLiner}</Text>

        <View style={[styles.row, { gap: 10, marginTop: 14 }]}>
          {profile.stats.map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>
                {stat.value}
                {stat.suffix ? ` ${stat.suffix}` : ''}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.h2]}>핵심 키워드</Text>
        <View style={styles.wrap}>
          {profile.keywords.map((keyword) => (
            <View key={keyword.label} style={styles.keyword}>
              <Text style={styles.keywordLabel}>{keyword.label}</Text>
              <Text style={styles.keywordProof}>{keyword.proof}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>소개</Text>
        <View>
          {profile.heroIntro.map((line) => (
            <Text key={line} style={styles.introItem}>
              {line}
            </Text>
          ))}
        </View>

        <Text style={styles.h2}>일하는 원칙</Text>
        <View>
          {profile.workingStyle.map((principle) => (
            <View key={principle.id} style={{ marginBottom: 5 }}>
              <Text style={styles.principleTitle}>
                {principle.title}{' '}
                <Text style={styles.principleEvidence}>({principle.evidenceRef.label})</Text>
              </Text>
            </View>
          ))}
        </View>

        <Footer pageLabel="1 / 3" />
      </Page>

      {/* ================= 2장 — 대표 프로젝트 ================= */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.h2, styles.h2First]}>대표 프로젝트</Text>
        <Text style={[styles.h1, { fontSize: 14 }]}>{featuredProject.title}</Text>
        <Text style={[styles.metaText, { marginTop: 2 }]}>{featuredProject.subtitle}</Text>
        <View style={[styles.metaRow, { marginTop: 6 }]}>
          <Text style={styles.metaText}>{featuredProject.period}</Text>
          <Text style={styles.metaText}>·</Text>
          <Text style={styles.metaText}>{featuredProject.domain}</Text>
          <Text style={styles.metaText}>·</Text>
          <Text style={styles.metaText}>{featuredProject.team}</Text>
        </View>

        <Text style={[styles.paragraph, { marginTop: 8 }]}>{featuredProject.summary}</Text>
        <Text style={[styles.paragraph, { marginTop: 6 }]}>
          <Text style={{ fontWeight: 600, color: color.ink }}>담당 범위 · </Text>
          {featuredProject.role.scope}
        </Text>

        <Text style={styles.h2}>기술 스택</Text>
        <View>
          {featuredProject.techStack.map((category) => {
            const coreSkills = category.skills.filter((s) => s.level === 'core')
            const names = (coreSkills.length > 0 ? coreSkills : category.skills)
              .map((s) => s.name)
              .join(', ')
            return (
              <View key={category.id} style={styles.techRow}>
                <Text style={styles.techCategory}>{category.title}</Text>
                <Text style={styles.techSkills}>{names}</Text>
              </View>
            )
          })}
        </View>

        <Text style={styles.h2}>결과</Text>
        <Text style={styles.paragraph}>{featuredProject.result.summary}</Text>
        <View style={{ marginTop: 6 }}>
          {featuredProject.result.outcomes.map((outcome) => (
            <View key={outcome.id} style={styles.outcomeRow}>
              <Text style={styles.outcomeLabel}>{outcome.label}</Text>
              <Text style={styles.outcomeValue}>{outcome.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>설계 판단 딥다이브</Text>
        <View>
          {shownDeepDives.map((deepDive) => (
            <View key={deepDive.id} style={styles.deepDiveCard}>
              <View style={styles.deepDiveHeaderRow}>
                <Text style={styles.deepDiveTag}>{deepDive.tag}</Text>
                <Text style={styles.deepDiveTitle}>{deepDive.title}</Text>
              </View>
              <Text style={styles.deepDiveMetric}>{deepDiveMetricText(deepDive)}</Text>
            </View>
          ))}
        </View>
        {remainingDeepDiveCount > 0 && (
          <Text style={styles.footerNote}>
            그 외 딥다이브 {remainingDeepDiveCount}건은 웹 포트폴리오에서 확인할 수 있습니다.
          </Text>
        )}

        <Footer pageLabel="2 / 3" />
      </Page>

      {/* ================= 3장 — 경력 · 다른 프로젝트 · 한계 ================= */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.h2, styles.h2First]}>경력</Text>
        <View>
          {workExperiences.map((exp) => (
            <View key={exp.id} style={styles.expEntry}>
              <View style={styles.expHeaderRow}>
                <View>
                  <Text style={styles.expOrg}>{exp.organization}</Text>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                </View>
                <Text style={styles.expPeriod}>{formatPeriod(exp.start, exp.end)}</Text>
              </View>
              {exp.achievements.slice(0, 2).map((achievement) => (
                <Text key={achievement} style={styles.achievement}>
                  · {achievement}
                </Text>
              ))}
            </View>
          ))}
        </View>
        <Text style={styles.footerNote}>
          학력·자격·교육 —{' '}
          {otherEntries
            .map((exp) => `${exp.organization} ${exp.title}(${formatPeriod(exp.start, exp.end)})`)
            .join(' · ')}
        </Text>

        <Text style={styles.h2}>다른 프로젝트</Text>
        <View>
          {highlightedProjects.map((project) => (
            <View key={project.id} style={styles.otherProjectRow}>
              <Text style={styles.otherProjectTitle}>{project.title}</Text>
              <Text style={styles.otherProjectMeta}>
                {project.subtitle} · {project.period}
              </Text>
              {project.highlights[0] && (
                <Text style={styles.otherProjectHighlight}>· {project.highlights[0]}</Text>
              )}
            </View>
          ))}
        </View>
        {remainingProjectCount > 0 && (
          <Text style={styles.footerNote}>
            개인 학습 프로젝트 {remainingProjectCount}건은 웹 포트폴리오에서 확인할 수 있습니다.
          </Text>
        )}

        <Text style={styles.h2}>담당 범위 · 아직 못한 것</Text>
        {scopeLimits.length > 0 && (
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 600, color: color.ink }}>담당 범위 밖 · </Text>
            {scopeLimits.map((l) => l.title).join(' · ')}
          </Text>
        )}
        {unfinishedLimits.length > 0 && (
          <Text style={[styles.paragraph, { marginTop: 3 }]}>
            <Text style={{ fontWeight: 600, color: color.ink }}>진행 중 · </Text>
            {unfinishedLimits.map((l) => l.title).join(' · ')}
          </Text>
        )}

        <Footer pageLabel="3 / 3" />
      </Page>
    </Document>
  )
}
