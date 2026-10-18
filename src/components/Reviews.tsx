import { m } from 'framer-motion'
import { reviews, salon } from '../data/salon'
import { Star } from './Icons'

const featured = ['jack', 'peter']

export function Reviews() {
  const max = Math.max(...reviews.topics.map((t) => t.count))
  const quotes = reviews.quotes.filter((q) => featured.includes(q.id))
  return (
    <section id="reviews" className="section reviews" aria-labelledby="reviews-title">
      <div className="wrap reviews__layout">
        <header className="reviews__score">
          <p className="eyebrow eyebrow--gold">What Sheen says</p>
          <h2 id="reviews-title" className="reviews__number">
            {reviews.rating}
            <span className="visually-hidden"> out of 5</span>
          </h2>
          <p className="reviews__stars" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={20} />
            ))}
          </p>
          <p className="reviews__count">from {reviews.count} Google reviews</p>
          <a className="link-gold" href={salon.links.reviews} target="_blank" rel="noopener">
            Read them on Google
          </a>
        </header>

        <div className="reviews__topics">
          <h3 className="reviews__sub">What reviewers mention most</h3>
          <ul>
            {reviews.topics.map((t, i) => (
              <li key={t.label}>
                <span className="topic__label">{t.label}</span>
                <span className="topic__bar" aria-hidden>
                  <m.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: t.count / max }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </span>
                <span className="topic__count">{t.count}</span>
              </li>
            ))}
          </ul>
          <p className="reviews__note">Number of Google reviews mentioning each, as grouped by Google.</p>
        </div>

        <div className="reviews__quotes">
          {quotes.map((q) => (
            <figure key={q.id} className="quote">
              <blockquote>
                <p>“{q.text}”</p>
              </blockquote>
              <figcaption>
                {q.author} · Google review · {q.year}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
