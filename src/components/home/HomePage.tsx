import { useNavigate, useOutletContext } from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from '../shared/Icons'
import { TrendSVG, RemoteSVG, BarSVG, BellSVG, WheelchairSVG } from '../icon'

// ---- Radialbar (Usage %) ----
function CircularProgress({ percent, colors, label }: {
  percent: number; colors: [string, string]; label: string
}) {
  const options: ApexOptions = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: { background: '#D4E9F7', strokeWidth: '100%' },
        dataLabels: {
          name: { show: false },
          value: { offsetY: 8, fontSize: '32px', fontWeight: '700', color: '#1a2a4a', formatter: v => `${v}%` },
        },
      },
    },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', gradientToColors: [colors[1]], stops: [0, 100] } },
    colors: [colors[0]],
    stroke: { lineCap: 'round' },
  }
  return (
    <div className="progress-item">
      <ReactApexChart type="radialBar" series={[percent]} options={options} height={260} width={260} />
      <p className="progress-desc">{label}</p>
    </div>
  )
}

// ---- Weekly Bar Chart (Analysis) ----
function WeeklyBarChart() {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    colors: ['#4A9EE8'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} kWh` } },
  }
  return <ReactApexChart type="bar" series={[{ name: 'การใช้ไฟ', data: [30, 45, 28, 60, 42, 55, 38] }]} options={options} height={220} />
}

// ---- Device Donut Chart (Remote) ----
function DeviceDonutChart() {
  const options: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['เปิดอยู่', 'ปิดอยู่'],
    colors: ['#4A9EE8', '#E8F2FB'],
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: { show: true, label: 'อุปกรณ์', fontSize: '13px', color: '#888', formatter: () => '4 / 6' },
            value: { fontSize: '22px', fontWeight: '700', color: '#1a2a4a' },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', fontSize: '13px' },
    stroke: { width: 0 },
  }
  return <ReactApexChart type="donut" series={[4, 2]} options={options} height={220} />
}

// ---- Monthly Area Chart (Summary) ----
function MonthlyAreaChart() {
  const options: ApexOptions = {
    chart: { type: 'area', toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2.5 },
    xaxis: { categories: ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05 } },
    colors: ['#5BC4B5'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} kWh` } },
  }
  return <ReactApexChart type="area" series={[{ name: 'kWh', data: [380, 420, 360, 410, 240] }]} options={options} height={220} />
}

// ---- Alert Bar Chart (Alerts) ----
function AlertBarChart() {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    colors: ['#F0954A'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} ครั้ง` } },
  }
  return <ReactApexChart type="bar" series={[{ name: 'แจ้งเตือน', data: [2, 0, 3, 1, 4, 1, 2] }]} options={options} height={220} />
}

// ---- Menu config ----
const HOME_MENUS: { path: string; lines: string[]; icon: React.ReactNode }[] = [
  { path: 'components/analysis/AnalysisPage',      lines: ['วิเคราะห์ /', 'จัดการการใช้ไฟฟ้า'], icon: <TrendSVG /> },
  { path: 'components/remote/RemotePage',          lines: ['รีโมทควบคุม', 'อุปกรณ์'],          icon: <RemoteSVG /> },
  { path: 'components/summary/SummaryPage',        lines: ['สรุปผล'],                           icon: <BarSVG /> },
  { path: 'components/alerts/AlertsPage',          lines: ['ตั้งค่าการแจ้งเตือน'],              icon: <BellSVG /> },
]

export default function HomePage() {
  const { openMenu } = useOutletContext<OutletCtx>()
  const navigate = useNavigate()

  return (
    <div className="screen">
      <div className="home-top-bar">
        <button className="icon-btn" onClick={openMenu}><MenuSVG /></button>
        <h1 className="app-title">Ecowatt Manager</h1>
        <div style={{ width: 38 }} />
      </div>

      {/* Usage Radialbar */}
      <div className="card">
        <div className="progress-row">
          <CircularProgress percent={24} colors={['#4A9EE8', '#87D4F9']} label="วันนี้ใช้ไฟแล้ว" />
          <CircularProgress percent={56} colors={['#5BC4B5', '#A8E6D9']} label="เดือนนี้ใช้ไฟแล้ว" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {[
          { label: 'วันนี้',     value: '2.4 kWh', sub: '฿ 8.40',          color: '#4A9EE8' },
          { label: 'เดือนนี้',   value: '68 kWh',  sub: '฿ 238.00',        color: '#5BC4B5' },
          { label: 'เฉลี่ย/วัน', value: '3.2 kWh', sub: '฿ 11.20',         color: '#F0954A' },
          { label: 'ประหยัดได้', value: '15%',     sub: 'vs เดือนที่แล้ว', color: '#5BC45B' },
        ].map(s => (
          <div key={s.label} className="card stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="stat-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-row">
        <div className="card">
          <p className="dashboard-chart-title">📊 การใช้ไฟรายสัปดาห์</p>
          <WeeklyBarChart />
        </div>
        <div className="card">
          <p className="dashboard-chart-title">🎮 สถานะอุปกรณ์</p>
          <DeviceDonutChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="dashboard-row">
        <div className="card">
          <p className="dashboard-chart-title">📋 แนวโน้มรายเดือน</p>
          <MonthlyAreaChart />
        </div>
        <div className="card">
          <p className="dashboard-chart-title">🔔 การแจ้งเตือนรายสัปดาห์</p>
          <AlertBarChart />
        </div>
      </div>

      {/* Menu shortcuts */}
      <div className="menu-grid">
        {HOME_MENUS.map(m => (
          <button key={m.path} className="card menu-card" onClick={() => navigate(m.path)}>
            <div className="menu-icon-box">{m.icon}</div>
            <span className="menu-label">
              {m.lines.map((line, i) => (
                <span key={i}>{line}{i < m.lines.length - 1 && <br />}</span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <button className="card access-card" onClick={() => navigate('components/accessibility/AccessibilityPage')}>
        <WheelchairSVG />
        <span className="access-label">ฟังก์ชันสำหรับผู้พิการ</span>
      </button>
    </div>
  )
}
