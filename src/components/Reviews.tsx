import { m } from 'framer-motion'
import { reviews, salon } from '../data/salon'

const featured = ['jack', 'peter']

export function Reviews() {
  const max = Math.max(...reviews.topics.map((t) => t.count))
  const quotes = reviews.quotes.filter((q) => featured.includes(q.id))
  return (
    <section id="reviews" className="block reviews" aria-labelledby="reviews-title">
      <div className="idx">
        <span>05</span>
        <span>What Sheen says</span>
      </div>

      <div className="reviews__grid">
        <header className="score">
          <h2 id="reviews-title" className="score__num">
            {reviews.rating}
            <span className="visually-hidden"> out of 5 on Google</span>
          </h2>
          <p className="score__of">
            out of 5, from {reviews.count} Google reviews.{' '}
            <a className="link" href={salon.links.reviews} target="_blank" rel="noopener">
              Read them
            </a>
          </p>
        </header>

        <div className="topics">
          <h3>What reviewers mention most</h3>
          <ul>
            {reviews.topics.map((t, i) => (
              <li key={t.label}>
                <span className="topics__label">{t.label}</span>
                <span className="topics__count">{t.count}</span>
                <span className="topics__bar" aria-hidden>
                  <m.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: t.count / max }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="topics__note">Number of reviews mentioning each, as Google groups them.</p>
        </div>

        <div className="reviews__quotes">
          {quotes.map((q) => (
            <figure key={q.id} className="quote quote--big">
              <blockquote>
                <p>“{q.text}”</p>
              </blockquote>
              <figcaption>
                {q.author}, Google review, {q.year}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
