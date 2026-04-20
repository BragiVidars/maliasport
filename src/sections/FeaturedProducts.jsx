import { useState } from 'react'
import './FeaturedProducts.css'
import { useCart } from '../context/CartContext'

const PRODUCTS = [
  {
    id: 1,
    name: 'Malía sport mini legghlífar',
    category: 'Legghlífar',
    price: '3.290 kr',
    img: '/p1.jpg',
    tag: null,
    sizes: null,
  },
  {
    id: 2,
    name: 'Nike JR Vapor 16 Club FG/MG',
    category: 'Takkaskór',
    price: '10.990 kr',
    images: [
      '/blair-takkaskor1-v3.jpeg',
      '/blair-takkaskor2-v3.jpeg',
    ],
    tag: null,
    sizes: ['33', '34', '36½', '38', '38½'],
    stock: { '33': 1, '34': 1, '36½': 1, '38': 1, '38½': 1 },
    description: 'FG/MG – Gras/Gervigras | Bláir og bleikir',
  },
  {
    id: 3,
    name: 'Nike JR vapor 16 club gervi gras skór',
    category: 'Gervigras skór',
    price: '9.990 kr',
    images: ['/gervigras-gulur.jpeg', '/gervigras-svartur.jpeg', '/gervigras-bleikur.jpeg'],
    tag: 'Vinsælt',
    variants: [
      { size: '30', color: 'Svartir' },
      { size: '30', color: 'Gulir' },
      { size: '30', color: 'Bleikir' },
      { size: '30½', color: 'Bleikir' },
      { size: '31½', color: 'Svartir' },
      { size: '31½', color: 'Gulir' },
    ],
    stock: { '30': 3, '30½': 1, '31½': 2 },
  },
  {
    id: 4,
    name: 'Nike markmannshanskar fyrir börn',
    category: 'Markmannshanskar',
    price: '5.490 kr',
    img: '/p4.jpg',
    tag: null,
    sizes: ['4', '6'],
    stock: { '4': 1, '6': 1 },
  },
  {
    id: 5,
    name: 'Nike merc pro pink black',
    category: 'Takkaskór',
    price: '15.990 kr',
    img: '/p5.jpg',
    tag: null,
    sizes: ['33', '34', '36½', '42'],
    stock: { '33': 1, '34': 1, '36½': 1, '42': 1 },
  },
  {
    id: 6,
    name: 'Nike JR Zoom Vapor 16 Academy FG/MG',
    category: 'Takkaskór',
    price: '16.990 kr',
    images: ['/vapor16-academy-1.jpeg', '/vapor16-academy-2.jpeg'],
    tag: null,
    sizes: ['33', '35½', '36½'],
    stock: { '33': 1, '35½': 1, '36½': 1 },
    description: 'FG/MG – Gras/Gervigras | Gulir takkaskór',
  },
  {
    id: 7,
    name: 'Nike JR zoom superfly 10 acad',
    category: 'Takkaskór',
    price: '16.990 kr',
    images: ['/superfly10-acad-1.jpeg', '/superfly10-acad-2.jpeg'],
    tag: null,
    sizes: ['33', '34'],
    stock: { '33': 1, '34': 1 },
  },
  {
    id: 8,
    name: 'Nike JR Zoom Superfly 10 Acad FG/MG',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/takkaskor-blair-sokk1.jpeg', '/takkaskor-blair-sokk.jpg'],
    tag: null,
    sizes: ['33', '34', '38', '38½'],
    stock: { '33': 1, '34': 1, '38': 1, '38½': 1 },
    description: 'FG/MG – Gras/Gervigras | Bláir og bleikir',
  },
  {
    id: 9,
    name: 'Nike Merc Pro FG SN10',
    category: 'Takkaskór',
    price: '27.990 kr',
    images: ['/vapor16-pro-ag-1.jpeg', '/vapor16-pro-ag-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['41', '42½', '44'],
    stock: { '41': 1, '42½': 1, '44': 1 },
    description: 'FG – Góðir fyrir gras | Bleikir',
  },
  {
    id: 10,
    name: 'Nike Phantom 6 High Acad FG/MG',
    category: 'Takkaskór',
    price: '37.990 kr',
    images: ['/phantom6-bakpoki-1.jpeg', '/phantom6-bakpoki-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og bláir',
    hidden: true,
  },
  {
    id: 11,
    name: 'Nike Mercurial Vapor 16 Academy FG/MG takkaskór',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/mercurial-vapor16-1.jpeg', '/mercurial-vapor16-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
  },
  {
    id: 12,
    name: 'Nike Zoom Vapor 16 Academy FG/MG',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: 'Vinsælt',
    sizes: ['42', '42½', '44'],
    stock: { '42': 1, '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og grænir',
  },
  {
    id: 13,
    name: 'Nike Phantom 6 High Pro FG',
    category: 'Takkaskór',
    price: '',
    images: ['/phantom6-high-pro-1.jpeg', '/phantom6-high-pro-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['44', '44½'],
    stock: { '44': 1, '44½': 1 },
    description: 'FG – Góðir fyrir gras | Rauðir og bláir',
    hidden: true,
  },
  {
    id: 14,
    name: 'Nike Phantom 6 Low Elite FG + taska',
    category: 'Takkaskór',
    price: '37.990 kr',
    images: ['/phantom6-low-elite-1.jpeg', '/phantom6-low-elite-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½'],
    stock: { '42½': 1 },
    description: 'FG – Góðir fyrir gras',
  },
  {
    id: 15,
    name: 'Nike ZM Vapor 16 Academy FG/MG',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/zm-vapor16-academy-1.jpeg', '/zm-vapor16-academy-2.jpeg'],
    tag: null,
    sizes: ['42', '42½', '43', '44'],
    stock: { '42': 1, '42½': 1, '43': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras',
  },
  {
    id: 24,
    name: 'Nike ZM Vapor 16 Academy FG/MG LV8',
    category: 'Takkaskór',
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
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: null,
    sizes: ['42½', '44'],
    stock: { '42½': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og hvítir',
    hidden: true,
  },
  {
    id: 16,
    name: 'Fótbolta mörk',
    category: 'Mörk',
    price: '9.990 kr',
    images: ['/litilmork-1.avif', '/litilmork-2.jpeg'],
    tag: null,
    sizes: null,
  },
  {
    id: 17,
    name: 'Fótbolta mark',
    category: 'Mörk',
    price: '18.990 kr',
    images: ['/fotboltamark-2.avif', '/fotboltamark-1.jpeg'],
    tag: null,
    sizes: null,
  },
  {
    id: 18,
    name: 'Nike Phantom 6 Low Club FG/MG',
    category: 'Takkaskór',
    price: '',
    images: ['/phantom6-low-club-1.jpeg', '/phantom6-low-club-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '43', '44'],
    stock: { '42½': 1, '43': 1, '44': 1 },
    description: 'FG/MG – Gras/Gervigras | Rauðir og bláir',
    hidden: true,
  },
  {
    id: 19,
    name: 'Nike ZM Vapor 16 Pro FG',
    category: 'Takkaskór',
    price: '',
    images: ['/zm-vapor16-pro-1.jpeg', '/zm-vapor16-pro-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42', '42½'],
    stock: { '42': 1, '42½': 1 },
    description: 'FG – Góðir fyrir gras | Bleikir',
    hidden: true,
  },
  {
    id: 20,
    name: 'Nike JR Vapor 16 Club TF PS (V) Barna',
    category: 'Gervigras skór',
    price: '9.990 kr',
    images: ['/gervigras-svartur.jpeg', '/gervigras-gulur.jpeg', '/gervigras-bleikur.jpeg'],
    tag: null,
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
  },
  {
    id: 21,
    name: 'Nike JR Vapor 16 Pro FG',
    category: 'Takkaskór',
    price: '15.990 kr',
    img: '/p5.jpg',
    tag: null,
    sizes: ['33', '34', '36½'],
    stock: { '33': 1, '34': 1, '36½': 1 },
    description: 'FG – Góðir fyrir gras | Fjólubláir',
    hidden: true,
  },
  {
    id: 26,
    name: 'Nike Zoom Vapor 16 Pro FG',
    category: 'Takkaskór',
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
    const images = p.images || [p.img]

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
          <img src={images[selectedImageIndex]} alt={p.name} className="featured__card-img" onError={e => { e.target.style.display = 'none'; }} />
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

  const filters = ['Allt', 'Takkaskór', 'Gervigras skór', 'Legghlífar', 'Markmannshanskar', 'Mörk']
  const visible = (activeFilter === 'Allt' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter)).filter(p => !p.hidden)

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
