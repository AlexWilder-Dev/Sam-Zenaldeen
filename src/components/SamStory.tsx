import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { reviews, story } from '../data/salon'
import portrait from '../assets/img/sam-portrait.webp'
import chair600 from '../assets/img/chair-600.webp'
import chair1000 from '../assets/img/chair-1000.webp'

const oliver = reviews.quotes.find((q) => q.id === 'oliver')!
const daniel = reviews.quotes.find((q) => q.id === 'daniel')!

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const },
}

/** Walnut frame whose brass lamp switches on as it comes into view */
function Mirror({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.figure
      className={`mirror ${className}`}
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: '-120px' }}
    >
      <motion.span
        className="mirror__lamp"
        aria-hidden
        variants={{
          off: { opacity: 0.25, boxShadow: '0 0 0 0 rgba(255,196,102,0)' },
          on: {
            opacity: [0.25, 1, 0.5, 1],
            boxShadow: '0 0 22px 8px rgba(255,196,102,0.5)',
            transition: { duration: 0.9, times: [0, 0.3, 0.45, 1] },
          },
        }}
      />
      <motion.div
        className="mirror__light"
        aria-hidden
        variants={{ off: { opacity: 0 }, on: { opacity: 1, transition: { delay: 0.5, duration: 1 } } }}
      />
      {children}
    </motion.figure>
  )
}

export function SamStory() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bigX = useTransform(scrollYProgress, [0, 1], ['8%', '-22%'])
  const chairY = useTransform(scrollYProgress, [0.3, 1], ['-6%', '6%'])

  return (
    <section ref={ref} id="sam" className="section section--wall story" aria-labelledby="sam-title">
      <motion.p className="story__big" style={{ x: bigX }} aria-hidden>
        Sam Zenaldeen
      </motion.p>
      <div className="wrap story__layout">
        <Mirror className="story__portrait">
          <img src={portrait} alt="Sam Zenaldeen in a navy waistcoat and tie" width={255} height={350} />
          <figcaption>Sam Zenaldeen</figcaption>
        </Mirror>

        <div className="story__text">
          <p className="eyebrow">Sam’s story</p>
          <h2 id="sam-title" className="title title--huge">
            A family trade,
            <br />
            <em>on Sheen Lane.</em>
          </h2>
          {story.paragraphs.map((t, i) => (
            <motion.p key={i} {...rise}>
              {t}
            </motion.p>
          ))}
          <motion.figure className="story__quote" {...rise}>
            <blockquote>“{oliver.text}”</blockquote>
            <figcaption>
              {oliver.author}, Google review, {oliver.year}
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <div className="wrap story__team">
        <Mirror className="mirror--wide">
          <div className="mirror__crop">
            <motion.img
              style={{ y: chairY }}
              src={chair600}
              srcSet={`${chair600} 600w, ${chair1000} 1000w`}
              sizes="(min-width: 900px) 40vw, 100vw"
              alt="A red leather chair facing a walnut-framed mirror and basin, by the front window"
              width={600}
              height={651}
              loading="lazy"
            />
          </div>
        </Mirror>
        <div className="story__teamtext">
          <p className="eyebrow">The team</p>
          <h3 className="title">Hand-picked</h3>
          <p>{story.team}</p>
          <p className="story__promise">{story.promise}</p>
          <figure className="story__quote story__quote--small">
            <blockquote>“{daniel.text}”</blockquote>
            <figcaption>
              {daniel.author}, Google review, {daniel.year}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
