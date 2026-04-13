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
    name: 'Nike JR vapor 16 club fg/mg',
    category: 'Takkaskór',
    price: '10.990 kr',
    images: [
      '/blair-takkaskor1-v3.jpeg',
      '/blair-takkaskor2-v3.jpeg',
      '/blair-takkaskor1.jpeg',
      '/blair-takkaskor2.jpeg',
      '/blair-takkaskor2.jpg',
    ],
    tag: null,
    sizes: ['33', '34', '36½', '38', '38⅕'],
  },
  {
    id: 3,
    name: 'Nike JR vapor 16 club gervi gras skór',
    category: 'Gervigras skór',
    price: '9.990 kr',
    images: ['/gervigras-gulur.jpeg', '/gervigras-svartur.jpeg', '/gervigras-bleikur.jpeg'],
    tag: 'Vinsælt',
    sizes: ['30 svartir', '30 grænir', '30 bleikir', '30½ bleikir', '31½ svartir', '31½ grænir'],
  },
  {
    id: 4,
    name: 'Nike markmannshanskar fyrir börn',
    category: 'Markmannshanskar',
    price: '5.490 kr',
    img: '/p4.jpg',
    tag: null,
    sizes: ['4', '6'],
  },
  {
    id: 5,
    name: 'Nike merc pro pink black',
    category: 'Takkaskór',
    price: '15.990 kr',
    img: '/p5.jpg',
    tag: null,
    sizes: ['33', '34', '36½', '42'],
  },
  {
    id: 6,
    name: 'Nike JR zoom vapor 16 academy fg/mg',
    category: 'Takkaskór',
    price: '16.990 kr',
    images: ['/vapor16-academy-1.jpeg', '/vapor16-academy-2.jpeg'],
    tag: null,
    sizes: ['33', '35½', '36½'],
  },
  {
    id: 7,
    name: 'Nike JR zoom superfly 10 acad',
    category: 'Takkaskór',
    price: '16.990 kr',
    images: ['/superfly10-acad-1.jpeg', '/superfly10-acad-2.jpeg'],
    tag: null,
    sizes: ['33', '34'],
  },
  {
    id: 8,
    name: 'Nike JR zoom superfly 10 acad fgmg',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/takkaskor-blair-sokk1.jpeg', '/takkaskor-blair-sokk.jpg'],
    tag: null,
    sizes: ['33', '34', '38', '38½'],
  },
  {
    id: 9,
    name: 'Nike Vapor 16 Pro AG-Pro takkaskór',
    category: 'Takkaskór',
    price: '27.990 kr',
    images: ['/vapor16-pro-ag-1.jpeg', '/vapor16-pro-ag-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['41', '42½', '44'],
  },
  {
    id: 10,
    name: 'Nike Phantom 6 Low Elite FG takkaskór + bakpoki',
    category: 'Takkaskór',
    price: '37.990 kr',
    images: ['/phantom6-bakpoki-1.jpeg', '/phantom6-bakpoki-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½'],
  },
  {
    id: 11,
    name: 'Nike Mercurial Vapor 16 Academy FG/MG takkaskór',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/mercurial-vapor16-1.jpeg', '/mercurial-vapor16-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½', '44'],
  },
  {
    id: 12,
    name: 'Nike Mercurial Zoom Vapor 16 Academy FG/MG takkaskór',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/mercurial-zoom-vapor16-1.jpeg', '/mercurial-zoom-vapor16-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42', '42½', '44'],
  },
  {
    id: 13,
    name: 'Nike Phantom 6 High Pro takkaskór',
    category: 'Takkaskór',
    price: '27.990 kr',
    images: ['/phantom6-high-pro-1.jpeg', '/phantom6-high-pro-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42', '42½', '44½'],
  },
  {
    id: 14,
    name: 'Phantom 6 low elite FG takkaskór',
    category: 'Takkaskór',
    price: '29.990 kr',
    images: ['/phantom6-low-elite-1.jpeg', '/phantom6-low-elite-2.jpeg'],
    tag: 'Nýtt',
    sizes: ['42½'],
  },
  {
    id: 15,
    name: 'ZM vapor 16 academy fg/mg takkaskór',
    category: 'Takkaskór',
    price: '17.990 kr',
    images: ['/zm-vapor16-academy-1.jpeg', '/zm-vapor16-academy-2.jpeg'],
    tag: null,
    sizes: ['42', '42½', '43', '44'],
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
]

function ProductCard({ p }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const images = p.images || [p.img]

  function handleAdd() {
    if (p.sizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem(p, selectedSize || null)
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
              />
            ))}
          </div>
        )}
      </div>
      <div className="featured__card-info">
        <span className="featured__card-cat">{p.category}</span>
        <h3 className="featured__card-name">{p.name}</h3>
        {p.sizes && (
          <select
            className={`featured__card-select${sizeError ? ' featured__card-select--error' : ''}`}
            value={selectedSize}
            onChange={e => { setSelectedSize(e.target.value); setSizeError(false) }}
          >
            <option value="">Veldu stærð…</option>
            {p.sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
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
  const visible = activeFilter === 'Allt' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter)

  return (
    <section className="featured" id="featured">
      <div className="featured__inner">
        <div className="featured__header">
          <div>
            <span className="featured__eyebrow">Allt úrvalið</span>
            <h2 className="featured__title">
              17 VÖRUR —<br />
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
