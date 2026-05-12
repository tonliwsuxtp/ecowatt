import { PageHeader } from '../shared/PageHeader'

const AUTHORS = [
  {
    name: 'Sudathip M.',
    role: 'Full-stack Developer',
    avatar: 'S',
    color: '#4A9EE8',
    email: '65011125@kmitl.ac.th',
    github: 'github.com/sudathip',
  },
]

export default function AuthorPage() {
  return (
    <div className="screen">
      <PageHeader title="เกี่ยวกับผู้พัฒนา" />

      <div className="card author-app-card">
        <div className="author-app-icon">⚡</div>
        <div>
          <p className="author-app-name">Ecowatt Manager</p>
          <p className="author-app-version">Version 1.0.0</p>
          <p className="author-app-desc">แอปพลิเคชันจัดการและติดตามการใช้ไฟฟ้าในบ้าน เพื่อช่วยประหยัดพลังงานและลดค่าไฟ</p>
        </div>
      </div>

      <h3 className="section-title" style={{ paddingLeft: 4 }}>ทีมผู้พัฒนา</h3>
      {AUTHORS.map(a => (
        <div key={a.name} className="card author-card">
          <div className="author-avatar" style={{ background: a.color }}>{a.avatar}</div>
          <div className="author-info">
            <p className="author-name">{a.name}</p>
            <p className="author-role">{a.role}</p>
            <div className="author-links">
              <span className="author-link">✉ {a.email}</span>
              <span className="author-link">🐙 {a.github}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="card">
        <h3 className="section-title">เทคโนโลยีที่ใช้</h3>
        <div className="tech-grid">
          {[
            { name: 'React 19',       color: '#61DAFB', bg: '#e8f9fd' },
            { name: 'TypeScript',     color: '#3178C6', bg: '#e8f0fb' },
            { name: 'Vite',           color: '#646CFF', bg: '#eeecff' },
            { name: 'React Router',   color: '#CA4245', bg: '#fdeaeb' },
          ].map(t => (
            <div key={t.name} className="tech-badge" style={{ background: t.bg, color: t.color }}>{t.name}</div>
          ))}
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '14px 16px' }}>
        <p style={{ fontSize: 13, color: '#aaa' }}>พัฒนาเพื่อการศึกษา · KMITL 2026</p>
        <p style={{ fontSize: 12, color: '#ccc', marginTop: 4 }}>© 2026 Ecowatt Manager. All rights reserved.</p>
      </div>
    </div>
  )
}
