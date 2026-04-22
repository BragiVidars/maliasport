// ...fjarlægjum þessa línu fyrir utan fylkið...
import { useState } from 'react'
import './FeaturedProducts.css'
import { useCart } from '../context/CartContext'

const PRODUCTS = [
  // — Vinsælustu vörurnar fremst —
  {
    id: 12,
    name: 'Nike Zoom Vapor 16 Academy FG/MG',
    category: 'Takkaskór',
    series: 'Academy',
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: 'Vinsælt',
    sizes: ['42', '42½', '44'],
    stock: { '42': 1, '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og grænir',
  },
  {
    id: 30,
    name: 'Nike ZM Vapor 16 Academy FG/MG',
    category: 'Takkaskór',
    series: 'Academy',
    price: '17.990 kr',
    images: ['/zm-vapor16-academy-1.jpeg', '/zm-vapor16-academy-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42', '42½', '43', '44'],
    stock: { '42': 1, '42½': 1, '43': 1, '44': 1 },
    description: 'FG/MG góðir á grasið & gervigrasið',
  },
  {
    id: 11,
    name: 'Nike ZM Vapor 16 Academy FG/MG LV8',
    category: 'Takkaskór',
    series: 'Academy',
    price: '17.990 kr',
    images: ['/mercurial-vapor16-1.jpeg', '/mercurial-vapor16-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
  },
  // — Junior —
  {
    id: 9,
    name: 'Nike JR Zoom Vapor 16 Pro FG',
    category: 'Takkaskór',
    series: 'Junior',
    price: '19.990 kr',
    images: ['/vapor16-pro-ag-1.jpeg', '/vapor16-pro-ag-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['33', '34', '36½'],
    stock: { '33': 1, '34': 1, '36½': 1 },
    description: 'FG – Góðir fyrir gras',
  },
  {
    id: 21,
    name: 'Nike JR Vapor 16 Pro FG',
    category: 'Takkaskór',
    series: 'Junior',
    price: '19.990 kr',
    img: '/p5.jpg',
    tag: 'Vinsælt',
    sizes: ['33', '34', '36½'],
    stock: { '33': 1, '34': 1, '36½': 1 },
    description: 'FG – Góðir fyrir gras | Fjólubláir',
  },
  {
    id: 8,
    name: 'Nike JR Zoom Superfly 10 Acad FG/MG',
    category: 'Takkaskór',
    series: 'Junior',
    price: '16.990 kr',
    images: ['/takkaskor-blair-sokk1.jpeg', '/takkaskor-blair-sokk.jpg'],
    tag: null,
    sizes: ['33', '34', '38', '38½'],
    stock: { '33': 1, '34': 1, '38': 1, '38½': 1 },
    description: 'FG/MG – Gras/Gervigras | Bláir og bleikir',
  },
  {
    id: 2,
    name: 'Nike JR Vapor 16 Club FG/MG',
    category: 'Takkaskór',
    series: 'Junior',
    price: '10.990 kr',
    images: ['/blair-takkaskor1-v3.jpeg', '/blair-takkaskor2-v3.jpeg'],
    tag: null,
    sizes: ['33', '34', '36½', '38', '38½'],
    stock: { '33': 1, '34': 1, '36½': 1, '38': 1, '38½': 1 },
    description: 'FG/MG – Gras/Gervigras | Bláir og bleikir',
  },
  {
    id: 20,
    name: 'Nike JR Vapor 16 Club TF PS (V) Barna',
    category: 'Gervigras skór',
    series: 'Junior',
    price: '9.900 kr',
    images: ['/gervigras-svartur.jpeg', '/gervigras-gulur.jpeg', '/gervigras-bleikur.jpeg'],
    tag: 'Vinsælt',
    description: 'TF – Gervigras',
    variants: [
      { size: '28½', color: 'Grænir' },
      { size: '30', color: 'Svartir' },
      { size: '30', color: 'Grænir' },
      { size: '30', color: 'Bleikir' },
      { size: '31½', color: 'Svartir' },
      { size: '31½', color: 'Grænir' },
      { size: '31½', color: 'Bleikir' },
    ],
    stock: { '28½': 1, '30': 3, '31½': 2 },
  },
  // — Pro —
  {
    id: 13,
    name: 'Nike Phantom 6 High Pro FG',
    category: 'Takkaskór',
    series: 'Pro',
    price: '31.990 kr',
    images: ['/phantom6-high-pro-1.jpeg', '/phantom6-high-pro-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['44', '44½'],
    stock: { '44': 1, '44½': 1 },
    description: 'FG – Góðir fyrir gras',
  },
  {
    id: 15,
    name: 'Nike ZM Vapor 16 Pro FG',
    category: 'Takkaskór',
    series: 'Pro',
    price: '33.990 kr',
    images: ['/zm-vapor16-academy-1.jpeg', '/zm-vapor16-academy-2.jpeg'],
    tag: 'Vinsælt',
    sizes: ['42½'],
    stock: { '42': 1, '42½': 1, '43': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras',
  },
  // — Elite —
  {
    id: 10,
    name: 'Nike Phantom 6 Low Elite FG + bakpoki',
    category: 'Takkaskór',
    series: 'Elite',
    price: '37.990 kr',
    images: ['/phantom6-bakpoki-1.jpeg', '/phantom6-bakpoki-2.jpeg'],
    tag: 'Vinsælt',
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og bláir',
  },
  // — Markmannshanskar —
  {
    id: 100,
    name: 'Nike markmannshanskar barna',
    category: 'Markmannshanskar',
    series: null,
    price: '5.490 kr',
    images: ['/p4-v2.jpg'],
    tag: null,
    sizes: ['4', '6'],
    stock: { '4': 2, '6': 2 },
    description: 'Stærðir fyrir börn. Svartir og hvítir.',
  },
  // — Sokkar —
  {
    id: 101,
    name: 'Nike sokkar hvítir – 3 pör',
    category: 'Sokkar',
    series: null,
    price: '3.490 kr',
    images: ['/sokkar-hvitir-v2.jpg'],
    tag: 'Nýtt',
    sizes: null,
    description: 'Hvítir Nike sokkar. 3 pör í pakka.',
  },
  // — Legghlífar —
  {
    id: 1,
    name: 'Malía sport mini legghlífar',
    category: 'Legghlífar',
    series: null,
    price: '3.290 kr',
    img: '/p1.jpg',
    tag: null,
    sizes: null,
  },
  // — Mörk —
  {
    id: 16,
    name: 'Fótbolta mörk',
    category: 'Mörk',
    series: null,
    price: '9.990 kr',
    images: ['/litilmork-1.avif', '/litilmork-2.jpeg'],
    tag: null,
    sizes: null,
  },
  {
    id: 17,
    name: 'Fótbolta mark',
    category: 'Mörk',
    series: null,
    price: '18.990 kr',
    images: ['/fotboltamark-2.avif', '/fotboltamark-1.jpeg'],
    tag: null,
    sizes: null,
  },
  // — Annað —
  {
    id: 102,
    name: 'Loft dæla',
    category: 'Annað',
    series: null,
    price: '6.990 kr',
    images: ['/pumpa.jpeg', '/pumpa1.jpeg', '/pumpa2.jpeg', '/pumpa3.jpeg'],
    tag: 'Nýtt',
    sizes: null,
    description: 'Þráðlaus loftdæla (air pump) * Hentar fyrir bíla, mótorhjól, hjól og bolta * Stillir loftþrýsting og stoppar sjálfkrafa * Innbyggt ljós (hentar í myrkri) * Sýnir loftþrýsting (PSI/BAR) á skjá * Endurhlaðanleg rafhlaða (3–5 klst hleðsla)',
  },
  // — Faldar vörur —
  {
    id: 24,
    name: 'Nike ZM Vapor 16 Academy FG/MG LV8',
    category: 'Takkaskór',
    series: 'Academy',
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: null,
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og grænir',
    hidden: true,
  },
  {
    id: 25,
    name: 'Nike ZM Vapor 16 Academy FG/MG LV8',
    category: 'Takkaskór',
    series: 'Academy',
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: null,
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og hvítir',
    hidden: true,
  },
  {
    id: 18,
    name: 'Nike Phantom 6 Low Club FG/MG',
    category: 'Takkaskór',
    series: 'Club',
    price: '',
    images: ['/phantom6-low-club-1.jpeg', '/phantom6-low-club-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '43', '44'],
    stock: { '42½': 1, '43': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og bláir',
    hidden: true,
  },
  {
    id: 26,
    name: 'Nike Zoom Vapor 16 Pro FG',
    category: 'Takkaskór',
    series: 'Pro',
    price: '',
    img: '/p5.jpg',
    tag: null,
    sizes: ['42½'],
    stock: { '42½': 1 },
    description: 'FG – Góðir fyrir gras | Fjólubláir',
    hidden: true,
  },
]



function ProductCard({ p }) {
  const { addItem, stockState } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [error, setError] = useState(null)

  try {
    // ...engin sérstök meðhöndlun fyrir markmannshanska...
    let images = p.images || [p.img]

    // Lagerstýring fyrir sizes
    let availableSizes = p.sizes || null
    if (p.stock && p.sizes) {
      availableSizes = p.sizes.filter(s => {
        const stockKey = `${p.id}-${s}`
        const stock = stockState && stockState[stockKey] !== undefined ? stockState[stockKey] : p.stock[s]
        return stock > 0
      })
    }

    // Lagerstýring fyrir variants
    let availableColors = []
    if (p.variants && selectedSize) {
      availableColors = [...new Set(p.variants.filter(v => v.size === selectedSize).map(v => v.color))]
    }

    function handleAdd() {
      if (availableSizes && !selectedSize) {
        setSizeError(true)
        return
      }
      if (p.variants && (!selectedSize || !selectedColor)) {
        setSizeError(true)
        return
      }
      setSizeError(false)
      const sizeLabel = p.variants ? `${selectedSize} — ${selectedColor}` : selectedSize || null
      addItem(p, sizeLabel)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    }

    return (
      <div className="featured__card">
        <div className="featured__card-img-wrap">
          {p.tag && <span className="featured__card-tag">{p.tag}</span>}
          <img src={images[selectedImageIndex]} alt={p.name} className="featured__card-img" />
          {images.length > 1 && (
            <div className="featured__card-thumbnails">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${p.name} ${i + 1}`}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`featured__card-thumb ${selectedImageIndex === i ? 'featured__card-thumb--active' : ''}`}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="featured__card-info">
          <span className="featured__card-cat">{p.category}</span>
          <h3 className="featured__card-name">{p.name}</h3>
          {p.description && (
            <p className="featured__card-desc">{p.description}</p>
          )}
          {availableSizes && (
            <select
              className={`featured__card-select${sizeError ? ' featured__card-select--error' : ''}`}
              value={selectedSize}
              onChange={e => { setSelectedSize(e.target.value); setSizeError(false) }}
            >
              <option value="">Veldu stærð…</option>
              {availableSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          {p.variants && (
            <>
              <select
                className={`featured__card-select${sizeError && !selectedSize ? ' featured__card-select--error' : ''}`}
                value={selectedSize}
                onChange={e => { setSelectedSize(e.target.value); setSelectedColor(''); setSizeError(false) }}
              >
                <option value="">Veldu stærð…</option>
                {p.variants && [...new Set(p.variants.map(v => v.size))].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                className={`featured__card-select${sizeError && selectedSize && !selectedColor ? ' featured__card-select--error' : ''}`}
                value={selectedColor}
                onChange={e => { setSelectedColor(e.target.value); setSizeError(false) }}
              >
                <option value="">{selectedSize ? 'Veldu lit…' : 'Veldu stærð fyrst'}</option>
                {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </>
          )}
          <div className="featured__card-footer">
            <span className="featured__card-price">{p.price}</span>
            <button className={`featured__card-btn${added ? ' featured__card-btn--added' : ''}`} onClick={handleAdd}>
              {added ? '✓ Bætt við' : 'Bæta í körfu'}
            </button>
          </div>
        </div>
      </div>
    )
  } catch (err) {
    return <div style={{ color: 'red', padding: 16 }}>Villa í vöru: {p.name} — {err.message}</div>
  }

  return (
    <div className="featured__card">
      <div className="featured__card-img-wrap">
        {p.tag && <span className="featured__card-tag">{p.tag}</span>}
        <img src={images[selectedImageIndex]} alt={p.name} className="featured__card-img" />
        {images.length > 1 && (
          <div className="featured__card-thumbnails">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${p.name} ${i + 1}`}
                onClick={() => setSelectedImageIndex(i)}
                className={`featured__card-thumb ${selectedImageIndex === i ? 'featured__card-thumb--active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="featured__card-info">
        <span className="featured__card-cat">{p.category}</span>
        <h3 className="featured__card-name">{p.name}</h3>
        {p.description && (
          <p className="featured__card-desc">{p.description}</p>
        )}
        {availableSizes && (
          <select
            className={`featured__card-select${sizeError ? ' featured__card-select--error' : ''}`}
            value={selectedSize}
            onChange={e => { setSelectedSize(e.target.value); setSizeError(false) }}
          >
            <option value="">Veldu stærð…</option>
            {availableSizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
        {p.variants && (
          <>
            <select
              className={`featured__card-select${sizeError && !selectedSize ? ' featured__card-select--error' : ''}`}
              value={selectedSize}
              onChange={e => { setSelectedSize(e.target.value); setSelectedColor(''); setSizeError(false) }}
            >
              <option value="">Veldu stærð…</option>
              {p.variants && [...new Set(p.variants.map(v => v.size))].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              className={`featured__card-select${sizeError && selectedSize && !selectedColor ? ' featured__card-select--error' : ''}`}
              value={selectedColor}
              onChange={e => { setSelectedColor(e.target.value); setSizeError(false) }}
            >
              <option value="">{selectedSize ? 'Veldu lit…' : 'Veldu stærð fyrst'}</option>
              {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </>
        )}
        <div className="featured__card-footer">
          <span className="featured__card-price">{p.price}</span>
          <button className={`featured__card-btn${added ? ' featured__card-btn--added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Bætt við' : 'Bæta í körfu'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState('Allt')

  const filters = ['Allt', 'Junior', 'Academy', 'Pro', 'Elite', 'Legghlífar', 'Sokkar', 'Markmannshanskar', 'Mörk']
  const visible = (activeFilter === 'Allt'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.series === activeFilter || p.category === activeFilter)
  ).filter(p => !p.hidden)

  return (
    <section className="featured" id="featured">
      <div className="featured__inner">
        <div className="featured__header">
          <div>
            <span className="featured__eyebrow">Allt úrvalið</span>
            <h2 className="featured__title">
              VÖRUÚRVAL —<br />
              <span>ALLT</span> FYRIR KNATTSPYRNU
            </h2>
          </div>
          <a href="https://maliasport.is/collections/all" target="_blank" rel="noreferrer" className="featured__see-all">
            Skoða á maliasport.is →
          </a>
        </div>

        <div className="featured__filters">
          {filters.map(f => (
            <button
              key={f}
              className={`featured__filter-btn${activeFilter === f ? ' featured__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="featured__grid">
          {visible.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>

  )
}
