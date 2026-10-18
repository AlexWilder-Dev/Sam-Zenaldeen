import { salon } from '../data/salon'

/*
 * The shopfront at 119 Sheen Lane in ink, from the owner's photograph:
 * brick above with two sash windows, the green fascia with the SZ mark and
 * lettering, two shop windows either side of a half-glazed door, stall
 * risers, and the paving. The fascia is the only colour, as on the street.
 */
export function ShopfrontDrawing({ lit }: { lit: boolean }) {
  const bricks: string[] = []
  for (let y = 12; y < 228; y += 18) {
    bricks.push(`M0,${y} L1000,${y}`)
    const off = (y / 18) % 2 ? 0 : 27
    for (let x = off; x < 1000; x += 54) bricks.push(`M${x},${y - 18} L${x},${y}`)
  }
  const sash = (x: number) => (
    <g key={x}>
      <rect className="fill" x={x} y={40} width={190} height={162} />
      <rect x={x + 10} y={50} width={170} height={142} />
      <path d={`M${x + 10},121 L${x + 180},121 M${x + 95},50 L${x + 95},192`} />
      <path d={`M${x - 10},202 L${x + 200},202 M${x - 10},210 L${x + 200},210`} />
    </g>
  )
  const inside = (x0: number, w: number) => (
    <g className="faint">
      {[0.22, 0.55, 0.85].map((f) => {
        const cx = x0 + w * f
        return (
          <g key={f}>
            <path d={`M${cx},392 L${cx},430 M${cx - 34},458 Q${cx},420 ${cx + 34},458 Z`} />
            {lit && <path className="rays" d={`M${cx - 18},470 L${cx - 26},486 M${cx},470 L${cx},490 M${cx + 18},470 L${cx + 26},486`} />}
          </g>
        )
      })}
      <path d={`M${x0 + 10},610 L${x0 + w - 10},610`} />
      {[0.3, 0.7].map((f) => {
        const cx = x0 + w * f
        return <path key={f} d={`M${cx - 30},690 L${cx - 30},560 Q${cx - 30},544 ${cx - 14},544 L${cx + 14},544 L${cx + 22},620 L${cx + 40},620 L${cx + 40},690`} />
      })}
    </g>
  )
  return (
    <svg className={`drawing shopfront${lit ? ' is-lit' : ''}`} viewBox="0 0 1000 900" role="img" aria-label="Ink drawing of the shopfront at 119 Sheen Lane: the green fascia with the SZ mark and the words Sam Zenaldeen, Gentlemen's Grooming, two lit shop windows and a half-glazed door">
      <path className="faint" d={bricks.join(' ')} />
      {sash(170)}
      {sash(640)}

      {/* cornice and fascia */}
      <path d="M20,230 L980,230 M28,238 L972,238" />
      <rect className="fascia" x={40} y={246} width={920} height={112} />
      <rect className="fascia-line" x={50} y={256} width={900} height={92} />
      <g className="sign">
        <rect x={270} y={268} width={68} height={68} />
        <text x={304} y={315} textAnchor="middle" className="sign__mark">
          SZ
        </text>
        <text x={358} y={304} className="sign__name">
          SAM ZENALDEEN
        </text>
        <text x={360} y={328} className="sign__trade">
          GENTLEMEN’S GROOMING
        </text>
        <text x={70} y={338} className="sign__small">
          {salon.phone.display}
        </text>
        <text x={930} y={338} textAnchor="end" className="sign__small">
          {salon.web}
        </text>
      </g>

      {/* pilasters */}
      <rect className="fill" x={40} y={358} width={36} height={442} />
      <rect className="fill" x={924} y={358} width={36} height={442} />

      {/* shop windows */}
      <rect className="glass-front" x={76} y={372} width={340} height={318} />
      {inside(76, 340)}
      <rect className="glass-front" x={584} y={372} width={340} height={318} />
      {inside(584, 340)}
      <rect x={76} y={372} width={340} height={318} />
      <rect x={584} y={372} width={340} height={318} />

      {/* stall risers */}
      <rect className="fill" x={76} y={690} width={340} height={110} />
      <rect className="faint" x={92} y={706} width={308} height={78} />
      <rect className="fill" x={584} y={690} width={340} height={110} />
      <rect className="faint" x={600} y={706} width={308} height={78} />

      {/* door */}
      <rect className="fill" x={430} y={372} width={140} height={428} />
      <rect className="glass-front" x={446} y={388} width={108} height={230} />
      <rect x={446} y={388} width={108} height={230} />
      <rect className="faint" x={446} y={640} width={108} height={140} />
      <rect x={472} y={600} width={56} height={8} />
      <circle cx={548} cy={630} r={5} />
      <text x={500} y={366} textAnchor="middle" className="sign__no">
        119
      </text>

      {/* paving */}
      <path className="heavy" d="M0,800 L1000,800" />
      <path className="faint" d="M0,836 L1000,836 M0,872 L1000,872 M120,800 L112,836 M330,800 L326,836 M560,800 L566,836 M780,800 L784,836 M40,836 L32,872 M250,836 L248,872 M470,836 L474,872 M690,836 L694,872 M900,836 L906,872" />
    </svg>
  )
}
