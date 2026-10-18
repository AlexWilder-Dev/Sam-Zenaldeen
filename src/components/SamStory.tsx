import { reviews, story } from '../data/salon'
import { RoomDrawing } from './RoomDrawing'
import portrait from '../assets/img/sam-portrait.webp'

const oliver = reviews.quotes.find((q) => q.id === 'oliver')!
const daniel = reviews.quotes.find((q) => q.id === 'daniel')!

export function SamStory() {
  return (
    <section id="sam" className="block story" aria-labelledby="sam-title">
      <div className="idx">
        <span>04</span>
        <span>Sam’s story</span>
      </div>

      <div className="story__grid">
        <h2 id="sam-title" className="display story__title">
          A family trade, <em>on Sheen Lane.</em>
        </h2>
        <figure className="story__portrait">
          <img src={portrait} alt="Sam Zenaldeen in a waistcoat and tie" width={255} height={350} loading="lazy" />
          <figcaption>Sam Zenaldeen</figcaption>
        </figure>
        <div className="story__text">
          {story.paragraphs.map((t, i) => (
            <p key={i} className={i === 0 ? 'story__lead' : undefined}>
              {t}
            </p>
          ))}
        </div>
        <figure className="pull story__pull">
          <blockquote>“{oliver.text}”</blockquote>
          <figcaption>
            {oliver.author}, Google review, {oliver.year}
          </figcaption>
        </figure>
      </div>

      <div className="story__team">
        <div className="story__drawing" aria-hidden>
          <RoomDrawing lit decorative crop="640 0 440 780" />
        </div>
        <div className="story__teamtext">
          <h3>The team</h3>
          <p>{story.team}</p>
          <p className="story__promise">Every appointment begins with a consultation. {story.promise}</p>
          <figure className="quote">
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
