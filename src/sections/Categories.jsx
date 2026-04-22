import './Categories.css'

const CATEGORIES = [
  {
    id: 1,
    name: 'Takkaskór',
    sub: 'Nike JR',
    img: '/p7.jpg',
  },
  {
    id: 3,
    name: 'Legghlífar',
    sub: 'Malía Sport mini',
    img: '/p1.jpg',
  },
  {
    id: 4,
    name: 'Markmannshanskar',
    sub: 'Nike — fyrir börn',
    img: '/p4-v2.jpg',
  },
]

export default function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="categories__inner">
        <div className="categories__header">
          <span className="categories__eyebrow">Vöruflokkar</span>
          <h2 className="categories__title">
            Knattspyrnubúnaður<br />
            <span className="categories__title-highlight">fyrir allan aldur</span>
          </h2>
        </div>

        <div className="categories__grid">
          {CATEGORIES.map(cat => (
            <a href="#featured" key={cat.id} className="categories__card">
              <div className="categories__card-img-wrap">
                <img src={cat.img} alt={cat.name} className="categories__card-img" />
                <div className="categories__card-overlay" />
              </div>
              <div className="categories__card-body">
                <h3 className="categories__card-name">{cat.name}</h3>
                <p className="categories__card-sub">{cat.sub}</p>
                <span className="categories__card-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
