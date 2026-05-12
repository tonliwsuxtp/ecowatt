import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from '../shared/Icons'
import { TrendSVG, RemoteSVG, BarSVG, BellSVG, WheelchairSVG } from '../icon'

// ---- Responsive hook ----
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

// ---- Radialbar ----
function CircularProgress({ percent, colors, label }: {
  percent: number; colors: [string, string]; label: string
}) {
  const isMobile = useIsMobile()
  const size = isMobile ? 160 : 260

  const options: ApexOptions = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: { background: '#D4E9F7', strokeWidth: '100%' },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 8,
            fontSize: isMobile ? '22px' : '32px',
            fontWeight: '700',
            color: '#1a2a4a',
            formatter: v => `${v}%`,
          },
        },
      },
    },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', gradientToColors: [colors[1]], stops: [0, 100] } },
    colors: [colors[0]],
    stroke: { lineCap: 'round' },
  }

  return (
    <div className="progress-item">
      <ReactApexChart type="radialBar" series={[percent]} options={options} height={size} width={size} />
      <p className="progress-desc">{label}</p>
    </div>
  )
}

// ---- Weekly Bar Chart ----
function WeeklyBarChart() {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: {  columnWidth: '55%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    colors: ['#4A9EE8'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} kWh` } },
  }
  return <ReactApexChart type="bar" series={[{ name: 'การใช้ไฟ', data: [30, 45, 28, 60, 42, 55, 38] }]} options={options} height={220} width="100%" />
}

// ---- Device Donut Chart ----
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
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#87D4F9'],
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', fontSize: '13px' },
    stroke: { width: 0 },
  }
  return <ReactApexChart type="donut" series={[4, 2]} options={options} height={220} width="100%" />
}

// ---- Monthly Area Chart ----
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
  return <ReactApexChart type="area" series={[{ name: 'kWh', data: [380, 420, 360, 410, 240] }]} options={options} height={220} width="100%" />
}

// ---- Alert Bar Chart ----
function AlertBarChart() {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '50%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    colors: ['#F0954A'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} ครั้ง` } },
  }
  return <ReactApexChart type="bar" series={[{ name: 'แจ้งเตือน', data: [2, 0, 3, 1, 4, 1, 2] }]} options={options} height={220} width="100%" />
}

export default function HomePage() {


  return (
    <div className="screen">
      

      {/* Dashboard — single card */}
      <div className="card dashboard-card">

        {/* Radialbar */}
        <div className="progress-row">
          <CircularProgress percent={24} colors={['#4A9EE8', '#87D4F9']} label="วันนี้ใช้ไฟแล้ว" />
          <CircularProgress percent={56} colors={['#5BC4B5', '#A8E6D9']} label="เดือนนี้ใช้ไฟแล้ว" />
        </div>

        <div className="dashboard-divider" />

        {/* Quick Stats */}
        <div className="stats-grid">
          {[
            { label: 'วันนี้',     value: '2.4 kWh', sub: '฿ 8.40',          color: '#4A9EE8' },
            { label: 'เดือนนี้',   value: '68 kWh',  sub: '฿ 238.00',        color: '#5BC4B5' },
            { label: 'เฉลี่ย/วัน', value: '3.2 kWh', sub: '฿ 11.20',         color: '#F0954A' },
            { label: 'ประหยัดได้', value: '15%',     sub: 'vs เดือนที่แล้ว', color: '#5BC45B' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-divider" />

        {/* Charts Row 1 */}
        <div className="dashboard-row">
          <div className="dashboard-col">
            <p className="dashboard-chart-title">📊 การใช้ไฟรายสัปดาห์</p>
            <WeeklyBarChart />
          </div>
          <div className="dashboard-col">
            <p className="dashboard-chart-title">🎮 สถานะอุปกรณ์</p>
            <DeviceDonutChart />
          </div>
        </div>

        <div className="dashboard-divider" />

        {/* Charts Row 2 */}
        <div className="dashboard-row">
          <div className="dashboard-col">
            <p className="dashboard-chart-title">📋 แนวโน้มรายเดือน</p>
            <MonthlyAreaChart />
          </div>
          <div className="dashboard-col">
            <p className="dashboard-chart-title">🔔 การแจ้งเตือนรายสัปดาห์</p>
            <AlertBarChart />
          </div>
        </div>

      </div>
    </div>
  )
}
