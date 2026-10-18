import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { reviews, story } from '../data/salon'
import portrait from '../assets/img/sam-portrait.webp'
import chair600 from '../assets/img/chair-600.webp'
import chair1000 from '../assets/img/chair-1000.webp'

const oliver = reviews.quotes.find((q) => q.id === 'oliver')!
const daniel = reviews.quotes.find((q) => q.id === 'daniel')!

/** Walnut frame whose brass lamp comes on as it scrolls into view, like the mirrors */
function Mirror({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <m.figure className={`mirror ${className}`} initial="off" whileInView="on" viewport={{ once: true, margin: '-100px' }}>
      <m.span
        className="mirror__lamp"
        aria-hidden
        variants={{
          off: { opacity: 0.3 },
          on: { opacity: [0.3, 1, 0.6, 1], transition: { duration: 0.8, times: [0, 0.35, 0.5, 1] } },
        }}
      />
      {children}
    </m.figure>
  )
}

export function SamStory() {
  return (
    <section id="sam" className="section story" aria-labelledby="sam-title">
      <div className="wrap story__layout">
        <Mirror className="story__portrait">
          <img src={portrait} alt="Sam Zenaldeen in a navy waistcoat and tie" width={255} height={350} loading="lazy" />
          <figcaption>Sam Zenaldeen</figcaption>
        </Mirror>

        <div className="story__text">
          <p className="eyebrow">Sam’s story</p>
          <h2 id="sam-title" className="title">
            A family trade,
            <br />
            <em>on Sheen Lane.</em>
          </h2>
          {story.paragraphs.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <figure className="story__quote">
            <blockquote>“{oliver.text}”</blockquote>
            <figcaption>
              {oliver.author}, Google review, {oliver.year}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="wrap story__team">
        <Mirror className="story__chair">
          <img
            src={chair600}
            srcSet={`${chair600} 600w, ${chair1000} 1000w`}
            sizes="(min-width: 900px) 40vw, 100vw"
            alt="A red leather chair facing a walnut-framed mirror and basin, by the front window"
            width={600}
            height={651}
            loading="lazy"
          />
        </Mirror>
        <div className="story__teamtext">
          <p className="eyebrow">The team</p>
          <h3 className="title title--small">Hand-picked</h3>
          <p>{story.team}</p>
          <p className="story__promise">Every appointment begins with a consultation. {story.promise}</p>
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
