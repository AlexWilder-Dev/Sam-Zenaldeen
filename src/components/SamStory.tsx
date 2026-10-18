import { motion } from 'framer-motion'
import { reviews, story } from '../data/salon'
import portrait from '../assets/img/sam-portrait.webp'
import chair600 from '../assets/img/chair-600.webp'
import chair1000 from '../assets/img/chair-1000.webp'

const oliver = reviews.quotes.find((q) => q.id === 'oliver')!
const daniel = reviews.quotes.find((q) => q.id === 'daniel')!

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
}

export function SamStory() {
  return (
    <section id="sam" className="section section--wall story" aria-labelledby="sam-title">
      <div className="wrap story__layout">
        <motion.figure className="mirror story__portrait" {...rise}>
          <span className="mirror__lamp" aria-hidden />
          <img src={portrait} alt="Sam Zenaldeen in a navy waistcoat and tie" width={255} height={350} />
          <figcaption>Sam Zenaldeen</figcaption>
        </motion.figure>

        <div className="story__text">
          <p className="eyebrow">Sam’s story</p>
          <h2 id="sam-title" className="title">
            A family trade, on Sheen Lane
          </h2>
          {story.paragraphs.map((t, i) => (
            <motion.p key={i} {...rise}>
              {t}
            </motion.p>
          ))}
          <motion.p className="story__dapper" {...rise}>
            Sharp and dapper.
          </motion.p>
          <motion.figure className="story__quote" {...rise}>
            <blockquote>“{oliver.text}”</blockquote>
            <figcaption>
              {oliver.author}, Google review, {oliver.year}
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <div className="wrap story__team">
        <motion.figure className="mirror mirror--wide" {...rise}>
          <span className="mirror__lamp" aria-hidden />
          <img
            src={chair600}
            srcSet={`${chair600} 600w, ${chair1000} 1000w`}
            sizes="(min-width: 900px) 40vw, 100vw"
            alt="A red leather chair facing a walnut-framed mirror and basin, by the front window"
            width={600}
            height={651}
            loading="lazy"
          />
        </motion.figure>
        <div className="story__teamtext">
          <p className="eyebrow">The team</p>
          <h3 className="title title--small">Hand-picked</h3>
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
