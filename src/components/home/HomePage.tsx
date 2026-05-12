import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { fetchDashboard, type DashboardData } from '../../api/mockApi'
import { LoadingSpinner, ErrorState } from '../shared/LoadingSpinner'
import { PageHeader } from '../shared/PageHeader'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

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
    <div className="flex flex-col items-center gap-[10px]">
      <ReactApexChart type="radialBar" series={[percent]} options={options} height={size} width={size} />
      <p className="text-sm text-[#3a5a7a] text-center">{label}</p>
    </div>
  )
}

function WeeklyBarChart({ data }: { data: number[] }) {
  const options: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '55%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], labels: { style: { colors: '#888', fontSize: '12px' } } },
    yaxis: { labels: { style: { colors: '#888', fontSize: '11px' } } },
    colors: ['#4A9EE8'],
    grid: { borderColor: '#f0f4f8', strokeDashArray: 4 },
    tooltip: { y: { formatter: v => `${v} kWh` } },
  }
  return <ReactApexChart type="bar" series={[{ name: 'การใช้ไฟ', data }]} options={options} height={220} width="100%" />
}

function DeviceDonutChart({ active, total }: { active: number; total: number }) {
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
            total: { show: true, label: 'อุปกรณ์', fontSize: '13px', color: '#888', formatter: () => `${active} / ${total}` },
            value: { fontSize: '22px', fontWeight: '700', color: '#1a2a4a' },
          },
        },
      },
    },
    fill: {
      type: ['gradient', 'solid'],
      gradient: { shade: 'dark', type: 'horizontal', gradientToColors: ['#87D4F9'], stops: [0, 100] },
    },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', fontSize: '13px' },
    stroke: { width: 0 },
  }
  return <ReactApexChart type="donut" series={[active, total - active]} options={options} height={220} width="100%" />
}

function MonthlyAreaChart({ data }: { data: number[] }) {
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
  return <ReactApexChart type="area" series={[{ name: 'kWh', data }]} options={options} height={220} width="100%" />
}

function AlertBarChart({ data }: { data: number[] }) {
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
  return <ReactApexChart type="bar" series={[{ name: 'แจ้งเตือน', data }]} options={options} height={220} width="100%" />
}

export default function HomePage() {
  const [data, setData]       = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchDashboard()
      .then(res => { setData(res); setLoading(false) })
      .catch(() => { setError('โหลดข้อมูล Dashboard ไม่สำเร็จ'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  return (
    <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 pt-8 pb-5 flex flex-col gap-5">

      <PageHeader title="หน้าหลัก" />

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-6">

        {loading && <LoadingSpinner />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {data && <>
          {/* Circular progress */}
          <div className="flex justify-around md:justify-center gap-4 md:gap-16 items-start py-2">
            <CircularProgress percent={data.dailyPct}   colors={['#4A9EE8', '#87D4F9']} label="วันนี้ใช้ไฟแล้ว" />
            <CircularProgress percent={data.monthlyPct} colors={['#5BC4B5', '#A8E6D9']} label="เดือนนี้ใช้ไฟแล้ว" />
          </div>

          <hr className="border-0 border-t border-[#f0f4f8]" />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.stats.map(s => (
              <div key={s.label} className="text-center py-4 px-2 bg-[#f8fbff] rounded-xl">
                <p className="text-xs text-[#888] mb-1">{s.label}</p>
                <p className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-[#aaa] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <hr className="border-0 border-t border-[#f0f4f8]" />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="min-w-0 pb-5 border-b border-[#f0f4f8] md:pb-0 md:pr-4 md:border-b-0 md:border-r md:border-[#f0f4f8]">
              <p className="text-[15px] font-bold text-[#1a2a4a] mb-1">📊 การใช้ไฟรายสัปดาห์</p>
              <WeeklyBarChart data={data.weeklyKwh} />
            </div>
            <div className="min-w-0 pt-5 md:pt-0 md:pl-4">
              <p className="text-[15px] font-bold text-[#1a2a4a] mb-1">🎮 สถานะอุปกรณ์</p>
              <DeviceDonutChart active={data.deviceActive} total={data.deviceTotal} />
            </div>
          </div>

          <hr className="border-0 border-t border-[#f0f4f8]" />

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="min-w-0 pb-5 border-b border-[#f0f4f8] md:pb-0 md:pr-4 md:border-b-0 md:border-r md:border-[#f0f4f8]">
              <p className="text-[15px] font-bold text-[#1a2a4a] mb-1">📋 แนวโน้มรายเดือน</p>
              <MonthlyAreaChart data={data.monthlyTrend} />
            </div>
            <div className="min-w-0 pt-5 md:pt-0 md:pl-4">
              <p className="text-[15px] font-bold text-[#1a2a4a] mb-1">🔔 การแจ้งเตือนรายสัปดาห์</p>
              <AlertBarChart data={data.weeklyAlerts} />
            </div>
          </div>
        </>}

      </div>
    </div>
  )
}
