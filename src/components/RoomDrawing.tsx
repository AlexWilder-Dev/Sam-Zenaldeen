import type { KeyboardEvent, ReactNode } from 'react'

/*
 * The salon, drawn in ink from the owner's panorama: five walnut-framed
 * mirrors with brass lamps, ribbed basins on a granite counter, the red
 * leather chairs, pendant lamps on twisted flex, the door to the back, the
 * coat stand, the reception counter with flowers and hot towels, and the
 * buttoned bench. Drawn as an elevation of the mirror wall.
 */

export type Pick = 'cut' | 'wash' | 'shave' | 'family'

export const VIEW = { w: 2400, h: 820 }
const X0 = 60
const STATION = 300
const COUNT = 5
const FLOOR = 760

/* A fixed scatter, so the granite and floor look the same every time */
function scatter(n: number, seed: number) {
  let s = seed
  const r = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  return Array.from({ length: n }, () => [r(), r()])
}

function Target({
  kind,
  label,
  onPick,
  off,
  children,
}: {
  kind: Pick
  label: string
  onPick: (k: Pick, e: Element) => void
  off?: boolean
  children: ReactNode
}) {
  if (off) return <g>{children}</g>
  const key = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPick(kind, e.currentTarget)
    }
  }
  return (
    <g className="target" role="button" tabIndex={0} aria-label={label} onClick={(e) => onPick(kind, e.currentTarget)} onKeyDown={key}>
      {children}
    </g>
  )
}

function Pendant({ x, lit }: { x: number; lit: boolean }) {
  const a: string[] = []
  const b: string[] = []
  for (let i = 0; i <= 14; i++) {
    a.push(`${x + (i % 2 ? 3 : -3)},${i * 12}`)
    b.push(`${x + (i % 2 ? -3 : 3)},${i * 12}`)
  }
  return (
    <g className="pendant">
      <polyline points={a.join(' ')} />
      <polyline points={b.join(' ')} />
      <path className="fill" d={`M${x - 12},168 L${x + 12},168 L${x + 16},180 Q${x + 62},196 ${x + 72},238 L${x - 72},238 Q${x - 62},196 ${x - 16},180 Z`} />
      <path d={`M${x - 16},180 L${x + 16},180`} />
      <path d={`M${x - 16},238 A16 11 0 0 0 ${x + 16},238`} />
      {lit && (
        <g className="rays">
          {[-46, -24, 0, 24, 46].map((dx) => (
            <path key={dx} d={`M${x + dx * 0.4},${262} L${x + dx},${262 + 26 - Math.abs(dx) * 0.2}`} />
          ))}
        </g>
      )}
    </g>
  )
}

function Sconce({ x, lit }: { x: number; lit: boolean }) {
  return (
    <g>
      <path d={`M${x},110 L${x},100`} />
      <path className="fill" d={`M${x - 8},100 Q${x},82 ${x + 8},100 Z`} />
      {lit && (
        <g className="rays">
          <path d={`M${x},78 L${x},70`} />
          <path d={`M${x - 11},82 L${x - 16},76`} />
          <path d={`M${x + 11},82 L${x + 16},76`} />
        </g>
      )}
    </g>
  )
}

function Mirror({ x }: { x: number }) {
  const gx = x + 30
  return (
    <g>
      <rect x={x - 6} y={96} width={292} height={14} />
      <rect x={x} y={110} width={280} height={410} />
      <rect x={x + 12} y={122} width={256} height={386} />
      <rect className="glass" x={gx} y={140} width={220} height={350} />
      <path className="faint" d={`M${gx + 150},146 L${gx + 214},210 M${gx + 176},146 L${gx + 214},184 M${gx + 12},430 L${gx + 60},484`} />
    </g>
  )
}

function Cabinet({ x }: { x: number }) {
  return (
    <g>
      <rect x={x + 8} y={536} width={284} height={204} />
      <rect x={x + 22} y={552} width={122} height={172} />
      <rect x={x + 156} y={552} width={122} height={172} />
      <circle cx={x + 136} cy={636} r={4} />
      <circle cx={x + 164} cy={636} r={4} />
    </g>
  )
}

function Basin({ x }: { x: number }) {
  const l = x + 8
  const r = x + 138
  return (
    <path
      className="fill"
      d={`M${l},468 Q${l},456 ${l + 14},456 L${x + 50},456 A23 18 0 0 0 ${x + 96},456 L${r - 14},456 Q${r},456 ${r},468 L${r - 10},520 L${l + 10},520 Z M${l + 2},478 L${r - 2},478 M${l + 4},490 L${r - 4},490 M${l + 6},502 L${r - 6},502`}
    />
  )
}

/* A barber chair in profile: headrest, piped back, arm, seat, footrest, pedestal */
function Chair({ cx }: { cx: number }) {
  return (
    <g>
      <path className="fill" d={`M${cx - 52},${FLOOR - 4} Q${cx - 52},${FLOOR - 16} ${cx - 38},${FLOOR - 16} L${cx + 38},${FLOOR - 16} Q${cx + 52},${FLOOR - 16} ${cx + 52},${FLOOR - 4} Z`} />
      <rect className="fill" x={cx - 10} y={690} width={20} height={54} />
      <path className="fill" d={`M${cx - 26},${690} L${cx + 26},${690} L${cx + 18},${676} L${cx - 18},${676} Z`} />
      <path className="fill" d={`M${cx + 52},674 L${cx + 74},728 L${cx + 100},728 L${cx + 100},736 L${cx + 64},736 L${cx + 44},676`} />
      <path className="fill" d={`M${cx - 74},496 Q${cx - 94},496 ${cx - 92},516 L${cx - 72},640 L${cx - 26},640 L${cx - 36},512 Q${cx - 38},496 ${cx - 56},496 Z`} />
      <path className="faint" d={`M${cx - 84},512 Q${cx - 86},500 ${cx - 74},502 L${cx - 56},502 Q${cx - 44},502 ${cx - 42},514 L${cx - 32},634 L${cx - 68},634 Z`} />
      <path className="faint" d={`M${cx - 66},508 L${cx - 54},630 M${cx - 52},508 L${cx - 42},630`} />
      <rect className="fill" x={cx - 88} y={454} width={46} height={30} rx={10} />
      <path d={`M${cx - 65},484 L${cx - 65},496`} />
      <path className="fill" d={`M${cx - 66},640 Q${cx - 68},628 ${cx - 54},628 L${cx + 50},628 Q${cx + 66},628 ${cx + 64},644 L${cx + 60},666 Q${cx + 58},676 ${cx + 46},676 L${cx - 56},676 Q${cx - 68},676 ${cx - 66},664 Z`} />
      <path d={`M${cx - 58},652 L${cx + 54},652`} className="faint" />
      <path d={`M${cx - 34},604 L${cx + 28},604 Q${cx + 50},604 ${cx + 50},622 L${cx + 50},628`} />
      <rect className="fill" x={cx - 34} y={590} width={72} height={14} rx={7} />
    </g>
  )
}

function Towels({ x, y }: { x: number; y: number }) {
  const roll = (rx: number, ry: number) => (
    <g key={`${rx}-${ry}`}>
      <path className="fill" d={`M${rx},${ry - 14} L${rx + 64},${ry - 14} A10 14 0 0 1 ${rx + 64},${ry + 14} L${rx},${ry + 14} Z`} />
      <ellipse className="fill" cx={rx} cy={ry} rx={10} ry={14} />
      <path d={`M${rx},${ry} m-3,0 a3 3 0 1 1 3,3 a6 6 0 1 1 -6,-6`} />
    </g>
  )
  return (
    <g>
      {roll(x, y - 14)}
      {roll(x + 30, y - 14)}
      {roll(x + 15, y - 42)}
    </g>
  )
}

function Flowers({ x }: { x: number }) {
  const heads = [
    [x - 26, 410, 13],
    [x + 4, 392, 15],
    [x + 30, 414, 12],
    [x - 6, 428, 11],
    [x + 20, 440, 10],
    [x - 34, 444, 9],
  ]
  return (
    <g>
      <path d={`M${x - 14},470 L${x - 14},536 M${x + 14},470 L${x + 14},536 M${x - 14},470 L${x + 14},470`} />
      {heads.map(([hx, hy]) => (
        <path key={`${hx}${hy}`} className="faint" d={`M${x},486 Q${(x + hx) / 2},${hy + 30} ${hx},${hy}`} />
      ))}
      <path className="fill" d={`M${x - 8},476 q-34,-14 -40,-34 q24,6 40,34 Z M${x + 8},474 q30,-18 32,-40 q-22,10 -32,40 Z`} />
      {heads.map(([hx, hy, r]) => (
        <g key={`h${hx}${hy}`}>
          <circle className="fill" cx={hx} cy={hy} r={r} />
          <circle cx={hx} cy={hy} r={r * 0.45} />
        </g>
      ))}
    </g>
  )
}

function Bench({ x }: { x: number }) {
  const buttons: ReactNode[] = []
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 9; col++) {
      const bx = x + 70 + col * 30 + (row % 2 ? 15 : 0)
      const by = 598 + row * 22
      buttons.push(<circle key={`${row}-${col}`} cx={bx} cy={by} r={2.6} className="dot" />)
    }
  const pleats: string[] = []
  for (let col = 0; col < 9; col++) {
    const bx = x + 70 + col * 30
    pleats.push(`M${bx},598 L${bx + 15},620 L${bx},642 M${bx},598 L${bx - 15},620 L${bx},642`)
  }
  return (
    <g>
      <path className="fill" d={`M${x + 40},664 L${x + 40},584 Q${x + 40},566 ${x + 60},566 L${x + 360},566 L${x + 360},664 Z`} />
      <path className="faint" d={pleats.join(' ')} />
      {buttons}
      <path className="fill" d={`M${x + 40},664 L${x + 360},664 L${x + 360},702 L${x + 40},702 Q${x + 30},702 ${x + 30},690 L${x + 30},676 Q${x + 30},664 ${x + 40},664 Z`} />
      <rect className="fill" x={x + 30} y={702} width={330} height={38} />
      <path className="fill" d={`M${x},740 L${x},610 Q${x},586 ${x + 22},586 Q${x + 46},586 ${x + 46},610 L${x + 46},740 Z`} />
      <path d={`M${x + 8},608 a12 12 0 1 1 24,0`} />
      <path d={`M${x + 12},740 L${x + 14},${FLOOR} M${x + 330},740 L${x + 328},${FLOOR}`} />
    </g>
  )
}

export function RoomDrawing({
  lit,
  onPick,
  crop,
  decorative = false,
}: {
  lit: boolean
  onPick?: (k: Pick, el: Element) => void
  /** viewBox override, to show part of the room */
  crop?: string
  decorative?: boolean
}) {
  const pick = onPick ?? (() => {})
  const stations = Array.from({ length: COUNT }, (_, i) => X0 + i * STATION)
  const granite = scatter(260, 7)
  const planks = scatter(26, 11)
  const runEnd = X0 + COUNT * STATION
  return (
    <svg
      className={`drawing${lit ? ' is-lit' : ''}${decorative ? ' is-decorative' : ''}`}
      viewBox={crop ?? `0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      {...(decorative
        ? { 'aria-hidden': true }
        : {
            role: 'group',
            'aria-label':
              'Ink drawing of the salon: five walnut-framed mirrors with basins and barber chairs, pendant lamps, the reception counter with flowers and hot towels, and the buttoned bench. The chairs, basins, towels and bench can be pressed to see their prices.',
          })}
    >
      {/* ceiling, cornice and downlights */}
      <path d={`M0,40 L${VIEW.w},40 M0,48 L${VIEW.w},48 M0,56 L${VIEW.w},56`} />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx={120 + i * 200} cy={24} rx={9} ry={4} className={lit ? 'dot' : undefined} />
      ))}

      {/* wainscot behind the counter and bench */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={runEnd + 250 + i * 160} y={430} width={140} height={300} className="faint" />
      ))}
      <path d={`M${runEnd + 170},416 L${VIEW.w},416`} />

      {/* the mirror wall */}
      {stations.map((x) => (
        <g key={x}>
          <Mirror x={x} />
          <Sconce x={x + 16} lit={lit} />
          <Sconce x={x + 264} lit={lit} />
        </g>
      ))}
      <path d={`M${X0 - 10},520 L${runEnd + 10},520 M${X0 - 10},536 L${runEnd + 10},536`} />
      {granite.map(([a, b], i) => (
        <circle key={i} className="dot" cx={X0 - 6 + a * (runEnd - X0 + 12)} cy={522 + b * 12} r={0.9} />
      ))}
      {stations.map((x) => (
        <Cabinet key={x} x={x} />
      ))}

      {/* door to the back, coat stand */}
      <rect x={runEnd + 40} y={190} width={118} height={570} />
      <rect x={runEnd + 52} y={202} width={94} height={558} />
      <rect x={runEnd + 66} y={224} width={66} height={220} className="faint" />
      <rect x={runEnd + 66} y={470} width={66} height={260} className="faint" />
      <circle cx={runEnd + 136} cy={470} r={5} />
      <g>
        <path d={`M${runEnd + 214},238 L${runEnd + 214},${FLOOR - 30}`} />
        <circle cx={runEnd + 214} cy={232} r={6} />
        <path d={`M${runEnd + 214},252 c-12,0 -28,4 -30,18 c-1,9 8,12 12,6 M${runEnd + 214},252 c12,0 28,4 30,18 c1,9 -8,12 -12,6`} />
        <path d={`M${runEnd + 214},292 c-10,0 -22,4 -23,14 c-1,7 6,9 9,4 M${runEnd + 214},292 c10,0 22,4 23,14 c1,7 -6,9 -9,4`} />
        <ellipse cx={runEnd + 214} cy={FLOOR - 120} rx={22} ry={5} />
        <path d={`M${runEnd + 214},${FLOOR - 30} c-6,14 -24,26 -48,30 M${runEnd + 214},${FLOOR - 30} c6,14 24,26 48,30 M${runEnd + 214},${FLOOR - 30} L${runEnd + 214},${FLOOR}`} />
      </g>

      {/* reception counter with flowers and towels */}
      <rect className="fill" x={runEnd + 270} y={536} width={300} height={12} />
      <rect className="fill" x={runEnd + 280} y={548} width={280} height={212} />
      <rect x={runEnd + 300} y={568} width={240} height={160} className="faint" />
      <Flowers x={runEnd + 500} />
      <Target off={decorative} kind="shave" label="Hot towels: the hot towel shave" onPick={pick}>
        <Towels x={runEnd + 296} y={534} />
      </Target>

      <Target off={decorative} kind="family" label="The bench: Father and Son" onPick={pick}>
        <Bench x={runEnd + 610} />
      </Target>

      {/* stations, front to back: basin and chair */}
      {stations.map((x, i) => (
        <g key={x}>
          <Target off={decorative} kind="wash" label={`Basin ${i + 1}: wash and blow-dry`} onPick={pick}>
            <Basin x={x} />
          </Target>
          <Target off={decorative} kind="cut" label={`Chair ${i + 1}: wash, cut and finish`} onPick={pick}>
            <Chair cx={x + 196} />
          </Target>
        </g>
      ))}

      {/* pendant lamps hang in front of everything */}
      {stations.map((x) => (
        <Pendant key={x} x={x + 196} lit={lit} />
      ))}
      <Pendant x={runEnd + 420} lit={lit} />

      {/* floor */}
      <path d={`M0,${FLOOR} L${VIEW.w},${FLOOR}`} className="heavy" />
      {[778, 796, 812].map((y, i) => (
        <path key={y} className="faint" d={`M0,${y} L${VIEW.w},${y}`} style={{ opacity: 0.7 - i * 0.15 }} />
      ))}
      {planks.map(([a, b], i) => {
        const y = [760, 778, 796][i % 3]
        const x = a * VIEW.w
        return <path key={i} className="faint" d={`M${x},${y} L${x + (b - 0.5) * 6},${y + 18}`} />
      })}
    </svg>
  )
}
