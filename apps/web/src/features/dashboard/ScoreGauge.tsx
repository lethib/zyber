interface ScoreGaugeProps {
  score: number
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getStrokeColor(score: number): string {
  if (score >= 80) return '#16a34a' // green-600
  if (score >= 40) return '#f59e0b' // amber-500
  return '#94a3b8' // slate-400
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE
  const strokeColor = getStrokeColor(score)

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      role="img"
      aria-label={`Score de conformité: ${score}%`}
    >
      <circle
        cx="70"
        cy="70"
        r={RADIUS}
        fill="none"
        stroke="#e4e4e7"
        strokeWidth="12"
      />
      <circle
        cx="70"
        cy="70"
        r={RADIUS}
        fill="none"
        stroke={strokeColor}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
      />
      <text
        x="70"
        y="70"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="24"
        fontWeight="600"
        fill="#18181b"
      >
        {score}%
      </text>
    </svg>
  )
}
